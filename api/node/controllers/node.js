'use strict';
const service = require('../services/node');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    return service.find(ctx);
  },
  async count(ctx) {
    return service.count(ctx);
  },
  async findOne(ctx) {
    return service.findOne(ctx);
  },
  async create(ctx) {
    ctx.body;
    return service.create(ctx);
  },
  async update(ctx) {
    return service.update(ctx);
  },
  async delete(ctx) {
    return service.delete(ctx);
  },
};
