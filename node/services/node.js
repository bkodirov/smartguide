'use strict';
const {create, find} = require('./repo');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(ctx) {

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
