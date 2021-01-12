'use strict';
const {create, find, count, update, remove, findAll, search} = require('./repo');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async search(term) {
    return search(term);
  },
  async find() {
    return findAll();
  },
  async count() {
    return count();
  },
  async findOne(id) {
    return find(id);
  },

  async create(node) {
    // Update UC children and return newly created object
    const createdNode = await create(node);
    // Returns nested objects
    const useCase = await strapi.services['use-case'].findOne(createdNode.use_case_id);
    if (!useCase.head_node) {
      useCase.head_node = createdNode;
    } else if (!useCase.nodes) {
      useCase.nodes = [createdNode]
    } else {
      useCase.nodes.push(createdNode._id)
    }
    await strapi.services['use-case'].update(useCase._id, useCase);
    return createdNode;
  },

  async update(nodeId, card) {
    return update(nodeId, card)
  },

  async delete(nodeId, cascadeDelete = true) {
    // Update UC children
    const nodeToDelete = await find(nodeId);
    if (!nodeToDelete) return null;
    // Find the use case the node belongs to
    if (nodeToDelete.use_case_id && cascadeDelete) {
      const useCase = await strapi.services['use-case'].findOne(nodeToDelete.use_case_id);
      // If there is a valid Use case
      if (useCase) {
        if (useCase.head_node.id === nodeToDelete._id) {
          useCase.head_node = null;
        } else {
          useCase.nodes.forEach(node => {
            node.question && node.question.answers.forEach(answer => {
              if (answer.node_id === nodeId) {
                answer.node_id = null;
              }
            });
          });
          // Remove the deleted node from the UseCase's nodes list
          useCase.nodes = useCase.nodes.filter(node => node._id !== nodeId)
        }
        await strapi.services['use-case'].update(useCase._id, useCase);
      }
    }
    return remove(nodeId);
  },
};
