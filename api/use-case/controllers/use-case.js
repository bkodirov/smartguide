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
    const { error } = validator.validateBody(ctx.request.body);
    if (error) {
      ctx.send(error.details[0], 400);
      return
    }
    try {
      const useCase = await strapi.services['use-case'].create(ctx.request.body);
      return ctx.response.created(useCase);
    } catch (e) {
      return ctx.response.send({message: e.toString()}, 400);
    }
  },

  async update(ctx) {
    const {id} = ctx.params;
    const bodyValidation  = validator.validateBody(ctx.request.body);
    const idValidation = validator.validateId(id);
    if (bodyValidation.error) return ctx.send(bodyValidation.error.details[0], 400);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);

    try {
      if (ctx.query._update_header) {
        // BookKeep the old node id
        // Update the header id
        // Find the Node
        // Fne the parent
        // Update the parent's answer
      } else {
        const updated = await strapi.services['use-case'].update(id, ctx.request.body);
        if (updated) {
          ctx.send({message: `Record with id:${id} updated`});
        } else {
          ctx.send({message: `Data with id:${id} not found`}, 404)
        }
      }
    } catch (e) {
      return ctx.response.send({message: e.toString()}, 400);
    }
  },

  async delete(ctx) {
    const {id} = ctx.params;
    const idValidation = validator.validateId(id);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);

    try {
      const deleteEntity = await strapi.services['use-case'].delete(id);
      if (deleteEntity) {
        ctx.deleted();
      } else {
        ctx.send({message: `Data with id:${id} not found`}, 404)
      }
    } catch (e) {
      return ctx.response.send({message: e.toString()}, 400);
    }
  },
};
