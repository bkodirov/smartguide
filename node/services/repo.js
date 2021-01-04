async function create(card) {
  if (!card) throw new Error('Card is required');
  const rawResults = await strapi.connections.mongo.raw(
    `db.cards.insertOne($${card})`
  );
  return rawResults.rows;
}

async function find(cardId) {
  if (!cardId) throw new Error('Card is required');
  const rawResults = await strapi.connections.mongo.raw(
    `db.cards.find( { id: ${cardId})`
  );
  return rawResults.rows;
}

module.exports = {create, find};
