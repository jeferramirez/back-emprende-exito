"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getUserMatricula(ctx) {
    const { id } = ctx.params;
    return await strapi.query("matricula").find({ users_permissions_user: id });
  },

  async reporteMatricula(ctx) {
    const { id } = ctx.params;
    const matriculas = await strapi
      .query("matricula")
      .find({ users_permissions_user: id });

    const reporteMatricula = matriculas.map((matricula) => {
      return {
        id: matricula.id,
        nombres: matricula.users_permissions_user.nombre,
        apellidos: matricula.users_permissions_user.apellido,
        email: matricula.users_permissions_user.email,
        estado: matricula.users_permissions_user.estado ? "activo" : "inactivo",
        programa: matricula.programa.nombre,
        fecha_matricula: matricula.created_at,
      };
    });

    ctx.send([...reporteMatricula]);
  },
};
