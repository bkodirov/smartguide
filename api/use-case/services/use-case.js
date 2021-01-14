'use strict';
const {create, find, count, update, remove, findAll} = require('./repo');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
function convertDbModel(useCase) {
  if (!useCase) return useCase;
  if (useCase.head_node) {
    useCase.head_node = useCase.head_node._id
  } else {
    useCase.nodes = useCase.nodes.map(node => node._id)
  }
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
    useCase = convertDbModel(useCase);
    return create(useCase);
  },

  async update(useCaseId, useCase) {
    useCase = convertDbModel(useCase);
    return update(useCaseId, useCase)
  },

  async delete(useCaseId) {
    // TODO Update Card and delete the UseCase
    const useCase = await find(useCaseId);
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
