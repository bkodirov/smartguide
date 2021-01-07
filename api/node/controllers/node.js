'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    return await strapi.services.node.find(ctx.query);
  },

  async count(ctx) {
    return strapi.services.node.count();
  },

  async findOne(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services.node.findOne(id);
    if (entity) {
      return entity;
    } else {
      ctx.response.send({message: `Record with id = ${id} not found`}, 404);
    }
  },

  async create(ctx) {
    await strapi.services.node.create(ctx.request.body);
    return ctx.response.created();
  },

  async update(ctx) {
    const {id} = ctx.params;
    const updated = await strapi.services.node.update(id, ctx.request.body);
    if (updated) {
      ctx.send({message: `Record with id:${id} updated`});
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const deleteEntity = await strapi.services.node.delete(id);
    if (deleteEntity) {
      ctx.deleted();
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },
};
