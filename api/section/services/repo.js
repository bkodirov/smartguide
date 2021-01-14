const {ObjectID} = require ('mongodb');

async function create(card) {
  if (!card) throw new Error('Card is required');
  const result = await strapi.connections.mongo.connection.db.collection('sections').insertOne(card);
  if (!result.ops || result.ops.length === 0) {
    throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
  }
  return toJson(result.ops[0]);
}

async function find(cardId) {
  if (!cardId) throw new Error('Card ID is required');
  const result = strapi.connections.mongo.connection.db.collection('sections').findOne({_id: ObjectID(cardId)});
  return toJson(result);
}

async function findAll() {
  const cursor = await strapi.connections.mongo.connection.db.collection('sections').find();
  const resultArray = [];
  for await (const doc of cursor) {
    resultArray.push(doc);
  }
  return resultArray.map(value => toJson(value));
}

async function count() {
  return await strapi.connections.mongo.connection.db.collection('sections').countDocuments();
}

async function update(cardId, card) {
  if (!card) throw new Error('Card is required');
  const result = await strapi.connections.mongo.connection.db.collection('sections').replaceOne({ _id: ObjectID(cardId) }, card);
  return result.result.ok === 1 && result.result.n > 0;
}

async function remove(cardId) {
  if (!cardId) throw new Error('Card is required');
  const deletionResult = await strapi.connections.mongo.connection.db.collection('sections').deleteOne({_id: ObjectID(cardId)});
  return deletionResult.deletedCount === 1;
}

module.exports = {create, find, count, findAll, remove, update};

function toJson(node) {
  if (node && node._id) {
    node._id = node._id.toString();
  }
  return node;
}
