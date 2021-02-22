'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._term) {
      entities = await strapi.services.article.search(ctx.query._term);
    } else {
      entities = await strapi.services.article.find();
    }
    return entities;
  },
};
