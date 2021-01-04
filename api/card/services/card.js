'use strict';
const {create, find} = require('../../card/services/repo');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(id) {

  },
  async count(ctx) {

  },
  async findOne(ctx) {

  },
  async create(node) {
    await create(ctx);
  },
  async update(ctx) {

  },
  async delete(ctx) {

  },
};
