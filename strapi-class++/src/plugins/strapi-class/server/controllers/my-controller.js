'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-class')
      .service('myService')
      .getWelcomeMessage();
  },
};
