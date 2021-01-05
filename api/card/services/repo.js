async function create(card) {
  if (!card) throw new Error('Card is required');
  const rawResults = await strapi.connections.mongo.connection.db.collection('cards').insertOne(card);
  return rawResults.rows;
}

async function find(cardId) {
  if (!cardId) throw new Error('Card ID is required');
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').findOne({id: cardId});
  return cursor.rows;
}

async function findAll() {
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').find();
  return cursor.rows;
}

async function count() {
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').count();
  return cursor.rows;
}

async function update(card) {
  if (!card) throw new Error('Card is required');
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').replaceOne({id: card.id}, card);
  return cursor.rows;
}

async function remove(cardId) {
  if (!cardId) throw new Error('Card is required');
  const cursor = await strapi.connections.mongo.connection.db.collection('cards').deleteOne({id: cardId});
  return cursor.rows;
}

module.exports = {create, find, count, findAll, remove, update};
