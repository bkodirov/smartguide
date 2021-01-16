const {ObjectID} = require ('mongodb');

async function create(section) {
  if (!section) throw new Error('Section is required');
  convertDbModel(section);
  const result = await strapi.connections.mongo.connection.db.collection('sections').insertOne(section);
  if (!result.ops || result.ops.length === 0) {
    throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
  }
  return toJson(result.ops[0]);
}

async function find(sectionId) {
  if (!sectionId) throw new Error('Section ID is required');
  const result = await strapi.connections.mongo.connection.db.collection('sections').findOne({_id: ObjectID(sectionId)});
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

async function update(sectionId, section) {
  if (!section) throw new Error('Section is required');
  convertDbModel(section);
  const result = await strapi.connections.mongo.connection.db.collection('sections').replaceOne({ _id: ObjectID(sectionId) }, section);
  return result.result.ok === 1 && result.result.n > 0;
}

async function remove(sectionId) {
  if (!sectionId) throw new Error('Section is required');
  const deletionResult = await strapi.connections.mongo.connection.db.collection('sections').deleteOne({_id: ObjectID(sectionId)});
  return deletionResult.deletedCount === 1;
}

module.exports = {create, find, count, findAll, remove, update};

function toJson(data) {
  if (data && data._id) {
    data._id = data._id.toString();
  }
  return data;
}

function convertDbModel(data) {
  if (!data) return data;
  if (data.cards) {
    data.cards = data.cards
      .filter(c => c !== null && c !== undefined)
      .map(card => card._id)
  }
  delete data._id;
  return data
}
