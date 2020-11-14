'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async listaLecciones(ctx) {
    const { idModulo } = ctx.params;
    return await strapi
      .query("leccion")
      .find({ modulo: idModulo });
  },

  async deleteLesson(ctx) {
    const { idLesson } = ctx.params;

    try{const actividades =  await strapi.query('actividad').find({ leccion: idLesson }, []);
      if(actividades.length > 0){
        actividades.map(async (actividad) => {
          await strapi.query('actividad').delete({ id: actividad.id });
        })
      }
      strapi.query('leccion').delete({ id: idLesson });
      ctx.send({code: 200, status: true})
    }catch(error){
      ctx.send({code: 400, status: false, error})
    }
  },
};
