'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    const entities = await strapi.services.card.find(ctx.query);
    return entities.map(entity => sanitizeEntity(entity));
  },

  async count(ctx) {
    return strapi.services.card.count();
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.card.findOne(id);
    return sanitizeEntity(entity);
  },

  async create(ctx) {
    const entity = await strapi.services.card.create(ctx.request.body);
    return sanitizeEntity(entity);
  },

  async update(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services.card.update({id}, ctx.request.body);
    return sanitizeEntity(entity);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.card.delete({ id });
    return sanitizeEntity(entity);
  },
};
