const {ObjectID} = require ('mongodb');

async function create(data) {
  if (!data) throw new Error('Data is required');
  data = convertDbModel(data);
  const result =  await strapi.connections.mongo.connection.db.collection('use_cases').insertOne(data);
  if (!result.ops || result.ops.length === 0) {
    throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
  }
  return toJson(result.ops[0]);
}

async function find(dataId) {
  if (!dataId) throw new Error('Data ID is required');
  const result = await strapi.connections.mongo.connection.db.collection('use_cases').findOne({_id: ObjectID(dataId)});
  return toJson(result);
}

async function findAll() {
  const cursor = await strapi.connections.mongo.connection.db.collection('use_cases').find();
  const resultArray = [];
  for await (const doc of cursor) {
    resultArray.push(doc);
  }
  return resultArray.map(value => toJson(value));
}

async function count() {
  return await strapi.connections.mongo.connection.db.collection('use_cases').countDocuments();
}

async function update(dataId, data) {
  if (!data) throw new Error('Data is required');
  if (!dataId) throw new Error('Data ID is required');
  const result = await strapi.connections.mongo.connection.db.collection('use_cases').replaceOne({ _id: ObjectID(dataId) }, data);
  return result.result.ok === 1 && result.result.n > 0;
}

async function remove(dataId) {
  if (!dataId) throw new Error('DataId is required');
  const deletionResult = await strapi.connections.mongo.connection.db.collection('use_cases').deleteOne({_id: ObjectID(dataId)});
  return deletionResult.deletedCount === 1;
}

module.exports = {create, find, count, findAll, remove, update};

function toJson(useCase) {
  if (useCase && useCase._id) {
    useCase._id = useCase._id.toString();
  }
  return useCase;
}

function convertDbModel(useCase) {
  if (!useCase) return useCase;
  delete useCase._id;
  return useCase
}
