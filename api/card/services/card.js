'use strict';
const {create, find, count, update, remove, findAll} = require('./repo');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

async function populateCard(dbCard) {
  dbCard.cards = await Promise.all(dbCard.cards.map(cardId => find(cardId)));
  dbCard.use_cases = await Promise.all(dbCard.use_cases.map(useCaseId => strapi.services["use-case"].find(useCaseId, false)));
  return dbCard
}

module.exports = {
  async find() {
    const cardList = await findAll();
    return Promise.all(cardList.map(card => populateCard(card)));
  },

  async count() {
    return count();
  },

  async findOne(id) {
    const card = await find(id);
    return populateCard(card)
  },

  async create(node) {
    return create(node);
  },

  async update(cardId, card) {
    return update(cardId, card)
  },

  async delete(cardId, recursive = false) {
    if (recursive) {
      const card = await find(cardId);
      await Promise.all(card.use_cases.map(useCaseId => strapi.services['use-case'].delete(useCaseId)));
      await Promise.all(card.cards.map(cardId => this.delete(cardId, true)));
      if (card.parent_card_id) {
        await this.delete(card.parent_card_id, false);
      } else if (card.section_id) {
        await strapi.services.section.delete(card.section_id, false);
      }
    }
    return remove(cardId);
  },
};
