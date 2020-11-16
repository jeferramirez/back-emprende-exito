'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async listaVideos(ctx) {
    const { idActivity } = ctx.params;
    return await strapi
      .query("videos")
      .find({ actividad: idActivity });
  }
};
