const {ObjectID} = require ('mongodb');

async function create(card) {
  if (!card) throw new Error('Card is required');
  return await strapi.connections.mongo.connection.db.collection('cards').insertOne(card);
}

async function find(cardId) {
  if (!cardId) throw new Error('Card ID is required');
  return strapi.connections.mongo.connection.db.collection('cards').findOne({_id: ObjectID(cardId)});
}

async function findAll() {
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').find();
  const resultArray = [];
  for await (const doc of cursor) {
    resultArray.push(doc);
  }
  return resultArray;
}

async function count() {
  return await strapi.connections.mongo.connection.db.collection('cards').countDocuments();
}

async function update(cardId, card) {
  if (!card) throw new Error('Card is required');
  const result = await strapi.connections.mongo.connection.db.collection('cards').replaceOne({ _id: ObjectID(cardId) }, card);
  return result.result.ok === 1 && result.result.n > 0;
}

async function remove(cardId) {
  if (!cardId) throw new Error('Card is required');
  const deletionResult = await strapi.connections.mongo.connection.db.collection('cards').deleteOne({_id: ObjectID(cardId)});
  return deletionResult.deletedCount === 1;
}

module.exports = {create, find, count, findAll, remove, update};
