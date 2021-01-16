'use strict';
const validator = require('./validator');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

/**
 *
 * @param ctx
 * @returns true if we shouldn't handle the request furthermore.
 */
module.exports = {

  async find(ctx) {
    return await strapi.services.section.find(ctx.query);
  },

  async count(ctx) {
    return strapi.services.section.count();
  },

  async findOne(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services.section.findOne(id);
    if (entity) {
      return entity;
    } else {
      ctx.response.send({message: `Record with id = ${id} not found`}, 404);
    }
  },

  async create(ctx) {
    const { error } = validator.validateBody(ctx.request.body);
    if (error) {
      return ctx.send(error.details[0], 400);
    }
    const newSection = await strapi.services.section.create(ctx.request.body);
    return ctx.response.created(newSection);
  },

  async update(ctx) {
    const {id} = ctx.params;
    const bodyValidation  = validator.validateBody(ctx.request.body);
    const idValidation = validator.validateId(id);
    if (bodyValidation.error) return ctx.send(bodyValidation.error.details[0], 400);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);

    const updated = await strapi.services.section.update(id, ctx.request.body);
    if (updated) {
      ctx.send(updated);
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const idValidation = validator.validateId(id);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);

    const deleteEntity = await strapi.services.section.delete(id);
    if (deleteEntity) {
      ctx.deleted(deleteEntity);
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },
};
