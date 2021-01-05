'use strict';
const {parseMultipartData, sanitizeEntity} = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    return await strapi.services.card.find(ctx.query);
  },

  async count(ctx) {
    return strapi.services.card.count();
  },

  async findOne(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services.card.findOne(id);
    if (entity) {
      return entity;
    } else {
      ctx.response.send({message: `Record with id = ${id} not found`}, 404);
    }
  },

  async create(ctx) {
    await strapi.services.card.create(ctx.request.body);
    return ctx.response.created();
  },

  async update(ctx) {
    const {id} = ctx.params;
    const updated = await strapi.services.card.update(id, ctx.request.body);
    if (updated) {
      ctx.send({message: `Record with id:${id} updated`})();
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const deleteEntity = await strapi.services.card.delete(id);
    if (deleteEntity) {
      ctx.deleted();
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },
};
