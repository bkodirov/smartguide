'use strict';
const {create, find, count, update, remove, findAll} = require('./repo');
const sectionRepo = require('../../section/services/repo');

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

  async findOne(id, recursive = true) {
    const card = await find(id);
    if (!card) throw Error(`No card found with id ${id}`);
    if (!recursive) return card;
    return populateCard(card)
  },

  async create(cardToCreate) {
    let card;
    if (cardToCreate.parent_card_id) {
      const parentCard = await this.findOne(cardToCreate.parent_card_id);
      if (!parentCard.cards) {
        parentCard.cards = [ ];
      }
      card = await create(cardToCreate);
      parentCard.cards.push(card);
      await this.update(cardToCreate.parent_card_id, parentCard);
    } else if (cardToCreate.section_id) {
      const section = await strapi.services.section.findOne(cardToCreate.section_id);
      if (!section) throw Error(`Section with id=${cardToCreate.section_id} not found`);
      if (!section.cards) {
        section.cards = []
      }
      card = await create(cardToCreate);
      section.cards.push(card);
      await strapi.services.section.update(cardToCreate.section_id, section);
    }
    return card;
  },

  async update(cardId, card) {
    return update(cardId, card)
  },

  async delete(cardId, recursive = true, updateParent = true) {
    const card = await find(cardId);
    if (!card) return null;
    if (recursive) {
      if (card.use_cases) {
        await Promise.all(card.use_cases.map(useCaseId => strapi.services['use-case'].delete(useCaseId)));
      }
      if (card.cards) {
        await Promise.all(card.cards.map(cardId => this.delete(cardId, true, false)));
      }
    }
    if (updateParent) {
      if (card.parent_card_id) {
        // 1. Fetch the parent
        const parent = await this.findOne(card.parent_card_id);
        // 2. Remove itself from parent
        parent.cards = parent.cards.filter(item => item._id !== cardId);
        // 3. Update parent
        await update(parent._id, parent);
      } else if (card.section_id) {
        // 1. Fetch the section
        const section = await strapi.services.section.findOne(card.section_id);
        // 2. Remove itself from parent
        section.cards = section.cards.filter(item => item._id !== cardId);
        // 3. Update the section
        await sectionRepo.update(section._id, section);
      }
    }
    return remove(cardId);
  },
};
