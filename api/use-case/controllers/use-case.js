'use strict';
const validator = require('./validator');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    return await strapi.services['use-case'].find(ctx.query);
  },

  async count(ctx) {
    return strapi.services['use-case'].count();
  },

  async findOne(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services['use-case'].findOne(id);
    if (entity) {
      return entity;
    } else {
      ctx.response.send({message: `Record with id = ${id} not found`}, 404);
    }
  },

  async create(ctx) {
    await strapi.services['use-case'].create(ctx.request.body);
    return ctx.response.created();
  },

  async update(ctx) {
    const {id} = ctx.params;
    const updated = await strapi.services['use-case'].update(id, ctx.request.body);
    if (updated) {
      ctx.send({message: `Record with id:${id} updated`});
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const deleteEntity = await strapi.services['use-case'].delete(id);
    if (deleteEntity) {
      ctx.deleted();
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },
};
