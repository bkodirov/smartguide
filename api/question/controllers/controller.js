'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.question.search(ctx.query);
    } else {
      entities = await strapi.services.question.find(ctx.query);
    }
    return entities;
  },

  async count(ctx) {
    return strapi.services.question.count();
  },

  async findOne(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services.question.findOne(id);
    if (entity) {
      return entity;
    } else {
      ctx.response.send({message: `Record with id = ${id} not found`}, 404);
    }
  },

  async create(ctx) {
    await strapi.services.question.create(ctx.request.body);
    return ctx.response.created();
  },

  async update(ctx) {
    const {id} = ctx.params;
    const updated = await strapi.services.question.update(id, ctx.request.body);
    if (updated) {
      ctx.send({message: `Record with id:${id} updated`});
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const deleteEntity = await strapi.services.question.delete(id);
    if (deleteEntity) {
      ctx.deleted();
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },
};
