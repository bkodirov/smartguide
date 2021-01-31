// const {ObjectID} = require('mongodb');
//
// async function create(data) {
//   if (!data) throw new Error('Data is required');
//   const result = await strapi.connections.mongo.connection.db.collection('nodes').insertOne(data);
//   convertDbModel(result);
//   if (!result.ops || result.ops.length === 0) {
//     throw Error(`No Object is returned for object creation. ${JSON.stringify(result, null, 2)}`);
//   }
//   return toJson(result.ops[0]);
// }
//
// async function find(dataId) {
//   if (!dataId) throw new Error('Data ID is required');
//   const result = await strapi.connections.mongo.connection.db.collection('nodes').findOne({_id: ObjectID(dataId)});
//   return toJson(result);
// }
//
// async function findAll() {
//   const cursor = await strapi.connections.mongo.connection.db.collection('nodes').find();
//   const resultArray = [];
//   for await (const doc of cursor) {
//     resultArray.push(doc);
//   }
//   return resultArray.map(value => toJson(value));
// }
//
// async function search(term) {
//   const cursor = await strapi.connections.mongo.connection.db.collection('nodes').find(
//     {
//       $or: [
//         {"question.question_text": {$regex: term, $options: "$i"}},
//         {"conclusion.text": {$regex: term, $options: "$i"}}
//       ]
//     }
//   );
//   const resultArray = [];
//   for await (const doc of cursor) {
//     resultArray.push(doc);
//   }
//   return resultArray.map(value => toJson(value));
// }
//
// async function count() {
//   return await strapi.connections.mongo.connection.db.collection('nodes').countDocuments();
// }
//
// async function update(dataId, data) {
//   if (!data) throw new Error('Data is required');
//   if (!dataId) throw new Error('Data ID is required');
//   convertDbModel(data);
//   const result = await strapi.connections.mongo.connection.db.collection('nodes').replaceOne({_id: ObjectID(dataId)}, data);
//   return result.result.ok === 1 && result.result.n > 0;
// }
//
// async function remove(dataId) {
//   if (!dataId) throw new Error('DataId is required');
//   const deletionResult = await strapi.connections.mongo.connection.db.collection('nodes').deleteOne({_id: ObjectID(dataId)});
//   return deletionResult.deletedCount === 1;
// }
//
// module.exports = {create, find, count, findAll, remove, update, search};
//
// function toJson(node) {
//   if (node && node._id) {
//     node._id = node._id.toString();
//   }
//   return node;
// }
//
// function convertDbModel(data) {
//   if (!data) return data;
//   if (data.cards) {
//     data.cards = data.cards.map(card => card._id)
//   }
//   delete data._id;
//   return data
// }
