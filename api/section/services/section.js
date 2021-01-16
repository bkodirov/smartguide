'use strict';
const {create, find, count, update, remove, findAll} = require('./repo');
const cardRepo = require('../../card/services/repo');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
async function populate(sectionDbModel) {
  if (sectionDbModel.cards) {
    sectionDbModel.cards = await Promise.all(sectionDbModel.cards
      .filter(c => c !== undefined && c !== null)
      .map(cardId => cardRepo.find(cardId)));
  }
  return sectionDbModel
}

module.exports = {

  async find() {
     const sectionList = await findAll();
     return Promise.all(sectionList.map(section => populate(section)));
  },

  async count() {
    return count();
  },

  async findOne(id) {
    const section = await find(id);
    if (!section) return section;
    return populate(section)
  },

  async create(section) {
    return create(section);
  },

  async update(sectionId, section) {
    return update(sectionId, section)
  },

  async delete(sectionId) {
    const section =  await find(sectionId);
    if (section.cards) {
      section.cards.map(sectionId => strapi.services.card.findOne(sectionId))
    }
    return remove(sectionId);
  },
};
