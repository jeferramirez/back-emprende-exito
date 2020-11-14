'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async listaModulos(ctx) {
    const { idProgram } = ctx.params;
    return await strapi
      .query("modulo")
      .find({ programa: idProgram });
  },

  async deleteModule(ctx) {
    const { idModule } = ctx.params;
    try{const lecciones =  await strapi.query('leccion').find({ modulo: idModule }, []);
      if(lecciones.length > 0){
        lecciones.map(async (leccion) => {
          const actividades =  await strapi.query('actividad').find({ leccion: leccion.id }, []);
          if(actividades.length > 0){
            actividades.map(async (actividad) => {
              await strapi.query('actividad').delete({ id: actividad.id });
            })
          }
          strapi.query('leccion').delete({ id: leccion.id });
        })
      }
      strapi.query('modulo').delete({ id: idModule});
      ctx.send({code: 200, status: true})
    }catch(error){
      ctx.send({code: 400, status: false, error})
    }
  },


};
