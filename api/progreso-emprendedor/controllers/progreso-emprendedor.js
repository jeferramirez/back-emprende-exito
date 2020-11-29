"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async setProgressID(ctx) {
    const { idUser, idRecurso, campo } = ctx.request.body;
    const recurso = await strapi
      .query("progreso-emprendedor")
      .findOne({ user: idUser, [campo]: idRecurso });

    return await strapi
      .query("progreso-emprendedor")
      .update({ id: recurso.id }, { completado: true });
  },

  async deleteProgress(ctx) {
    const { idRecurso, campo } = ctx.request.body;
    return await strapi
      .query("progreso-emprendedor")
      .delete({[campo]: idRecurso });

  },

  async progressProgram(ctx) {
    const { idUser, idProgram } = ctx.params;
    const total = await strapi
      .query("progreso-emprendedor")
      .count({ user: idUser, programa: idProgram });

    const completado = await strapi
      .query("progreso-emprendedor")
      .count({ user: idUser, programa: idProgram, completado: true });

    const porcentaje = (completado * 100) / total;

    ctx.send({ code: 200, status: true, porcentaje });
  },

  async progressModule(ctx) {
    const { idUser, idModule } = ctx.params;
    const total = await strapi
      .query("progreso-emprendedor")
      .count({ user: idUser, modulo: idModule });

    const completado = await strapi
      .query("progreso-emprendedor")
      .count({ user: idUser, modulo: idModule, completado: true });

    const porcentaje = (completado * 100) / total;

    ctx.send({ code: 200, status: true, porcentaje });
  },

  async createProgreso(ctx) {
    const { idUser } = ctx.params;

    try {
      const matriculas = await strapi
        .query("matricula")
        .find({ users_permissions_user: idUser }, []);

      if (matriculas.length > 0) {
        matriculas.map(async (matricula) => {
          const modulos = await strapi
            .query("modulo")
            .find({ programa: matricula.programa }, []);

          if (modulos.length > 0) {
            modulos.map(async (modulo) => {
              const lecciones = await strapi
                .query("leccion")
                .find({ modulo: modulo.id }, []);

              if (lecciones.length > 0) {
                lecciones.map(async (leccion) => {
                  const actividades = await strapi
                    .query("actividad")
                    .find({ leccion: leccion.id }, []);

                  if (actividades.length > 0) {
                    actividades.map(async (actividad) => {
                      const videos = await strapi
                        .query("videos")
                        .find({ actividad: actividad.id }, []);
                      if (videos.length > 0) {
                        videos.map(async (video) => {
                          const existe = await strapi
                            .query("progreso-emprendedor")
                            .findOne({ video: video.id, user: idUser });
                          if (!existe) {
                            await strapi.query("progreso-emprendedor").create({
                              video: video.id,
                              imagene: "",
                              user: idUser,
                              documento: "",
                              completado: false,
                              programa: matricula.programa,
                              modulo: modulo.id,
                            });
                          }
                        });
                      }
                      const imagenes = await strapi
                        .query("imagenes")
                        .find({ actividad: actividad.id }, []);

                      if (imagenes.length > 0) {
                        imagenes.map(async (imagen) => {
                          const existe = await strapi
                            .query("progreso-emprendedor")
                            .findOne({ imagene: imagen.id, user: idUser });
                          if (!existe) {
                            await strapi.query("progreso-emprendedor").create({
                              video: "",
                              imagene: imagen.id,
                              user: idUser,
                              documento: "",
                              completado: false,
                              programa: matricula.programa,
                              modulo: modulo.id,
                            });
                          }
                        });
                      }
                      const documentos = await strapi
                        .query("documento")
                        .find({ actividad: actividad.id }, []);

                      if (documentos.length > 0) {
                        documentos.map(async (documento) => {
                          const existe = await strapi
                            .query("progreso-emprendedor")
                            .findOne({ documento: documento.id, user: idUser });
                          if (!existe) {
                            await strapi.query("progreso-emprendedor").create({
                              video: "",
                              imagene: "",
                              user: idUser,
                              documento: documento.id,
                              completado: false,
                              programa: matricula.programa,
                              modulo: modulo.id,
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
      ctx.send({ code: 200, status: true });
    } catch (error) {
      ctx.send({ code: 400, status: false, error });
    }
  },
};
