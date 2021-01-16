const {ObjectID} = require ('mongodb');

async function create(card) {
  if (!card) throw new Error('Card is required');
  convertDbModel(card);
  const result = await strapi.connections.mongo.connection.db.collection('cards').insertOne(card);
  if (!result.ops || result.ops.length === 0) {
    throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
  }
  return toJson(result.ops[0]);
}

async function find(cardId) {
  if (!cardId) throw new Error('Card ID is required');
  const result = await strapi.connections.mongo.connection.db.collection('cards').findOne({_id: ObjectID(cardId)});
  return toJson(result);
}

async function findAll() {
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').find();
  const resultArray = [];
  for await (const doc of cursor) {
    resultArray.push(doc);
  }
  return resultArray.map(value => toJson(value));
}

async function count() {
  return await strapi.connections.mongo.connection.db.collection('cards').countDocuments();
}

async function update(cardId, card) {
  if (!card) throw new Error('Card is required');
  convertDbModel(card);
  const result = await strapi.connections.mongo.connection.db.collection('cards').replaceOne({ _id: ObjectID(cardId) }, card);
  if (!result.ops || result.ops.length === 0) {
    throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
  }
  return toJson(result.ops[0]);
}

async function remove(cardId) {
  if (!cardId) throw new Error('Card is required');
  const result = await strapi.connections.mongo.connection.db.collection('cards').findOneAndDelete({_id: ObjectID(cardId)});
  if (!result.value) {
    throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
  }
  return toJson(result.value);
}

module.exports = {create, find, count, findAll, remove, update};

function toJson(node) {
  if (node && node._id) {
    node._id = node._id.toString();
  }
  return node;
}

function convertDbModel(data) {
  if (!data) return data;
  if (data.cards) {
    data.cards = data.cards.map(card => card._id)
  }
  if (data.use_cases) {
    data.use_cases = data.use_cases.map(item => item._id)
  }
  delete data._id;
  return data
}
