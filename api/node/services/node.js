'use strict';
const crypto = require('crypto');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async search(useCaseId, term) {
    const useCase = await strapi.services['use-case'].findOne(useCaseId);
    return useCase.nodes.filter(item => {
      let canBeAnswer = false
      if (item.question) {
        canBeAnswer = item.question.question_text.includes(term)
        if (!canBeAnswer && item.question.explanation) {
          canBeAnswer = item.question.explanation.includes(term)
        }
      } else if (item.conclusion) {
        canBeAnswer = item.conclusion.text.includes(term)
      } else {
        console.error(`Found a node without question or conclusion`)
      }
      return canBeAnswer
    })
  },
  async find() {
    throw Error('Not supported operation')
  },
  async count() {
    throw Error('Not supported operation')
  },
  async findOne(id) {
    throw Error('Not supported operation')
  },

  async create(node) {
    // Update UC children and return newly created object
    const parentNodeId = node.parent_node_id;
    const answerId = node.parent_answer_id;
    delete node.parent_node_id;
    delete node.parent_answer_id;

    // Add Unique id to the node
    node._id = crypto.randomBytes(16).toString("hex");
    if (node.question) {
      if (!node.question.answers) node.question.answers = []
      node.question.answers = node.question.answers.map(item => {
        if (!item._id) {
          item._id = crypto.randomBytes(16).toString("hex");
        }
        return item;
      });
    }

    const useCase = await strapi.services['use-case'].findOne(node.use_case_id);

    if (!useCase.head_node_id) {
      useCase.head_node_id = node._id;
    }
    if (!useCase.nodes) {
      useCase.nodes = [node]
    } else {
      useCase.nodes.push(node)
    }
    // If the node has a parent, make sure its
    if (parentNodeId) {
      if (!answerId) throw Error('Node has Parent but not AnswerID')
      useCase.nodes.forEach(nextNode => {
        if (nextNode._id === parentNodeId) {
          if (nextNode.question) {
            nextNode.question.answers.forEach(answer => {
              if (answer._id === answerId) answer.node_id = node._id
            })
          } else {
            console.error(`Parent node doesn't have a question. Illegal state`)
          }
        }
      });
    }
    await strapi.services['use-case'].update(useCase._id, useCase);
    return node;
  },

  async update(nodeId, node) {
    // Update UC children
    const useCase = await strapi.services['use-case'].findOne(node.use_case_id);
    useCase.nodes = useCase.nodes.filter(node => node._id !== nodeId);
    useCase.nodes.push(node)
    const updatedUseCase = await strapi.services['use-case'].update(useCase._id, useCase);
    return node;
  },

  async delete(useCaseId, nodeId) {
    // Update UC children
    const useCase = await strapi.services['use-case'].findOne(useCaseId);
    let nodeToDelete;
    // If there is a valid Use case
    if (useCase) {
      if (useCase.head_node_id === nodeId) {
        nodeToDelete = useCase.head_node
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
        useCase.nodes = useCase.nodes.filter(node => {
          const shouldDelete = node._id === nodeId
          if (shouldDelete) {
            nodeToDelete = node;
          }
          return shouldDelete;
        })
      }
      await strapi.services['use-case'].update(useCase._id, useCase);
    }
    return remove(nodeId);
  },
};
