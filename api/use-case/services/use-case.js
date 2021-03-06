'use strict';
const {create, find, count, update, remove, findAll} = require('./repo');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
function convertDbModel(useCase) {
  if (!useCase) return useCase;
  delete useCase._id;
  return useCase
}

module.exports = {
  async find() {
    // Append head node
    let results = await findAll();
    if (!results) return null;
    results = await Promise.all(results.map(async useCase => {
      if (useCase.head_node) useCase.head_node = await strapi.services.node.findOne(useCase.head_node);
      if (useCase.nodes) useCase.nodes = await Promise.all(useCase.nodes.map(nodeId => strapi.services.node.findOne(nodeId)));
      return useCase;
    }));
    return results;

  },

  async count() {
    return count();
  },

  async findOne(id, recursive = true) {
    // Append head node
    const result = await find(id);
    if (!result) return null;
    if (result.head_node && recursive) {
      result.head_node = await strapi.services.node.findOne(result.head_node);
      if (result.nodes) result.nodes = await Promise.all(result.nodes.map(nodeId => strapi.services.node.findOne(nodeId)));
    }
    return result;
  },

  async create(useCase) {
    // Fetch the parent Card
    const parentCard = await strapi.services.card.findOne(useCase.parent_card_id);
    //Create a use case
    const createdUseCase = await create(useCase);
    if (!parentCard.use_cases) {
      parentCard.use_cases = [];
    }
    parentCard.use_cases.push(createdUseCase);
    const updatedParentCard = await strapi.services.card.update(parentCard._id, parentCard);
    return createdUseCase;
  },

  async update(useCaseId, useCase) {
    useCase = convertDbModel(useCase);
    return update(useCaseId, useCase)
  },

  async delete(useCaseId, updateParent = true) {
    const useCase = await find(useCaseId);
    if (updateParent){
      const parentCard = await strapi.services.card.findOne(useCase.parent_card_id);
      parentCard.use_cases = parentCard.use_cases.filter(uc => uc._id !== useCaseId);
      await strapi.services.card.update(useCase.parent_card_id, parentCard);
    }

    if (!useCase) return null;
    if (useCase.head_node) {
      await strapi.services.node.delete(useCase.head_node, false)
    }
    if (useCase.nodes) {
      await Promise.all(useCase.nodes.map(nodeId => strapi.services.node.delete(nodeId, false)))
    }
    return remove(useCaseId);
  },
};
