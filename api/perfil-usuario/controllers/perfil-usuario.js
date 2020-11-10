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
};
