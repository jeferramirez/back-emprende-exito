"use strict";
const bcrypt = require("bcrypt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async perfilUser(ctx) {
    const { idUser } = ctx.params;
    return await strapi
      .query("perfil-usuario")
      .findOne({ users_permissions_user: idUser }, []);
  },

  async validatePass(ctx) {
    const { idUser, currentPass } = ctx.request.body;
    const resp = await strapi
      .query("perfil-usuario")
      .findOne({ users_permissions_user: idUser }, ["users_permissions_user"]);
    const hash = resp.users_permissions_user.password;

    const result = await bcrypt.compare(currentPass, hash);
    if (result) {
      ctx.send({ code: 200, status: true });
    } else {
      ctx.send({ code: 400, status: false });
    }
  },

  async reporteUsuario(ctx) {
    const usuarios = await strapi.query("perfil-usuario").find();
    const arrayFichas = usuarios.map((usuario) => {
      return strapi.query("ficha-seguimiento").findOne({
        users_permissions_user: usuario.users_permissions_user.id,
        _sort: "published_at:desc",
      });
    });

    const resp = await Promise.all(arrayFichas);
    const reporteUsuario = usuarios.map((usuario) => {
      const ficha_seguimiento = resp.find((element) => {
        if (element) {
          if (
            element.users_permissions_user.id ===
            usuario.users_permissions_user.id
          ) {
            return element;
          }
        }
      });
      return {
        id: usuario.users_permissions_user.id,
        nombres: usuario.users_permissions_user.nombre,
        apellidos: usuario.users_permissions_user.apellido,
        email: usuario.users_permissions_user.email,
        estado: usuario.users_permissions_user.estado ? 'activo' : 'inactivo',
        intereses: usuario.intereses === null? '' : usuario.intereses,
        habilidades: usuario.habilidades === null? '' : usuario.habilidades,
        tipoProyecto: usuario.tipoProyecto === null? '' : usuario.tipoProyecto,
        profesion: usuario.profesion === null? '' : usuario.profesion,
        ocupacion: usuario.ocupacion === null? '' : usuario.ocupacion,
        fechaSeguimiento: ficha_seguimiento
          ? ficha_seguimiento.fecha_ultimoseguimiento
          : "",
      };
    });
    ctx.send([...reporteUsuario]);
  },
};
