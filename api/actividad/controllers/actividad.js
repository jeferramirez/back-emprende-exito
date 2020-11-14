'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async listaActividades(ctx) {
    const { idLesson } = ctx.params;
    return await strapi
      .query("actividad")
      .find({ leccion: idLesson });
  },
};
