const {ObjectID} = require ('mongodb');

async function create(data) {
  if (!data) throw new Error('Data is required');
  return await strapi.connections.mongo.connection.db.collection('nodes').insertOne(data);
}

async function find(dataId) {
  if (!dataId) throw new Error('Data ID is required');
  return strapi.connections.mongo.connection.db.collection('nodes').findOne({_id: ObjectID(dataId)});
}

async function findAll() {
  const cursor = await strapi.connections.mongo.connection.db.collection('nodes').find();
  const resultArray = [];
  for await (const doc of cursor) {
    resultArray.push(doc);
  }
  return resultArray;
}

async function count() {
  return await strapi.connections.mongo.connection.db.collection('nodes').countDocuments();
}

async function update(dataId, data) {
  if (!data) throw new Error('Data is required');
  if (!dataId) throw new Error('Data ID is required');
  const result = await strapi.connections.mongo.connection.db.collection('nodes').replaceOne({ _id: ObjectID(dataId) }, data);
  return result.result.ok === 1 && result.result.n > 0;
}

async function remove(dataId) {
  if (!dataId) throw new Error('DataId is required');
  const deletionResult = await strapi.connections.mongo.connection.db.collection('nodes').deleteOne({_id: ObjectID(dataId)});
  return deletionResult.deletedCount === 1;
}

module.exports = {create, find, count, findAll, remove, update};
