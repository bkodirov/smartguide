'use strict';
const validator = require('./validator');
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
    const { error } = validator.validateBody(ctx.request.body);
    if (error) {
      ctx.send(error.details[0], 400);
      return
    }
    try {
      const createdCard = await strapi.services.card.create(ctx.request.body);
      return ctx.response.created(createdCard);
    } catch (e) {
      return ctx.response.send({message: JSON.stringify(e.toString(), null, 2)}, 400);
    }
  },

  async update(ctx) {
    const {id} = ctx.params;
    const bodyValidation  = validator.validateBody(ctx.request.body);
    const idValidation = validator.validateId(id);
    if (bodyValidation.error) return ctx.send(bodyValidation.error.details[0], 400);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);

    try {
      const updated = await strapi.services.card.update(id, ctx.request.body);
      if (updated) {
        ctx.send(updated);
      } else {
        ctx.send({message: `Data with id:${id} not found`}, 404)
      }
    } catch (e) {
      return ctx.response.send({message: JSON.stringify(e.toString(), null, 2)}, 400);
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const idValidation = validator.validateId(id);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);
    try {
      const deleteEntity = await strapi.services.card.delete(id);
      if (deleteEntity) {
        ctx.deleted(deleteEntity);
      } else {
        ctx.send({message: `Data with id:${id} not found`}, 404)
      }
    } catch (e) {
      return ctx.response.send({message: JSON.stringify(e.toString(), null, 2)}, 400);
    }
  },
};
