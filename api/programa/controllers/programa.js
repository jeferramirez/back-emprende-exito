'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


module.exports = {
  async deleteProgram(ctx) {
    const { idProgram } = ctx.params;
    try{const modulos =  await strapi.query('modulo').find({ programa: idProgram }, []);
    if(modulos.length > 0){
      modulos.map( async (modulo) => {
        const lecciones =  await strapi.query('leccion').find({ modulo: modulo.id }, []);
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
        strapi.query('modulo').delete({ id: modulo.id });
      })
    }
    strapi.query('programa').delete({ id: idProgram });
      ctx.send({code: 200, status: true})
    }catch(error){
      ctx.send({code: 400, status: false, error})
    }
  },
};

