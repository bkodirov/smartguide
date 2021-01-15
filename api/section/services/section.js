'use strict';
const {create, find, count, update, remove, findAll} = require('./repo');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async find() {
    return findAll();
  },
  async count() {
    return count();
  },
  async findOne(id) {
    return find(id);
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
