
async function search(term) {
  const cursor = await strapi.connections.mongo.connection.db.collection('articles').find({$text: {$search: `\"${term}\"`}});
  const resultArray = [];
  for await (const doc of cursor) {
    resultArray.push(doc);
  }
  return resultArray.map(value => toJson(value));
}


module.exports = {search};

function toJson(article) {
  if (article && article._id) {
    article._id = article._id.toString();
  }
  return article;
}
