'use strict';
const {create, find, count, update, remove, findAll, search} = require('./repo');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async search(term) {
    return search(term);
  },
  async find() {
    return findAll();
  },
  async count() {
    return count();
  },
  async findOne(id) {
    return find(id);
  },
  async create(node) {
    return create(node);
  },
  async update(cardId, card) {
    return update(cardId, card)
  },
  async delete(cardId) {
    return remove(cardId);
  },
};
