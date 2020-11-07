"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async busca(ctx) {
    const { edad } = ctx.params;
    console.log(edad);
    const entity = await strapi.services.perfil.find({ users_permissions_user: edad },['users_permissions_user']);
    console.log(entity);
    return sanitizeEntity(entity, { model: strapi.models.perfil });
  },
};
