'use strict';

module.exports = {
  async perfilUser(ctx) {
    const { idUser } = ctx.params;
    return await strapi
    .query('ficha-seguimiento')
    .find({ users_permissions_user: idUser }, ['users_permissions_user']);
    }
};
