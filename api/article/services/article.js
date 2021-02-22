'use strict';
const repo = require('./repo')
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async search(term) {
    if (!term || term.trim().length === 0) return []
    return repo.search(term)
  }
};
