'use strict';
const validator = require('./validator');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    let entities;
    if (ctx.query._term) {
      if (!ctx.query._use_case_id) return ctx.response.send({message: `Node search must have _use_case_id query param`}, 400);
      entities = await strapi.services.node.search(ctx.query._use_case_id, ctx.query._term);
    } else {
      entities = await strapi.services.node.find();
    }
    return entities;
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
    const { error } = validator.validateBody(ctx.request.body);
    if (error) {
      ctx.send(error.details[0], 400);
      return
    }
    await strapi.services.node.create(ctx.request.body);
    return ctx.response.created();
  },

  async update(ctx) {
    const {id} = ctx.params;
    const bodyValidation  = validator.validateBody(ctx.request.body);
    const idValidation = validator.validateId(id);
    if (bodyValidation.error) return ctx.send(bodyValidation.error.details[0], 400);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);

    try {
      const updated = await strapi.services.node.update(id, ctx.request.body);
      if (updated) {
        ctx.send({message: `Record with id:${id} updated`});
      } else {
        ctx.send({message: `Data with id:${id} not found`}, 404)
      }
    } catch (e) {
      console.error(e)
      ctx.send({message: `Server app run into an issue`}, 500)
    }
  },

  async delete(ctx) {
    const {use_case_id, id} = ctx.params;
    const idValidation = validator.validateId(id);
    const useCaseIdValidation = validator.validateId(use_case_id);
    if (idValidation.error) return ctx.send(idValidation.error.details[0], 400);
    if (useCaseIdValidation.error) return ctx.send(useCaseIdValidation.error.details[0], 400);

    const deleteEntity = await strapi.services.node.delete(use_case_id, id);
    if (deleteEntity) {
      ctx.deleted();
    } else {
      ctx.send({message: `Data with id:${id} not found`}, 404)
    }
  },
};
