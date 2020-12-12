'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async getSeguimientoByProgram(ctx) {
    const { id, idUser } = ctx.params;
    return await strapi.query("ficha-seguimiento").find({ programa: id,  users_permissions_user: idUser });
  },

  async perfilUser(ctx) {
    const { idUser } = ctx.params;
    return await strapi
      .query("ficha-seguimiento")
      .find({ users_permissions_user: idUser }, ["users_permissions_user"]);
  },

  async sendmail(ctx) {
    const { userEmail } = ctx.request.body;
    const user  = await strapi.query('user', 'users-permissions').findOne({ email: userEmail });
    const bdEmail = user.email;

    if (userEmail === bdEmail) {
      const codeRecovery = uid();
      const url = 'http://localhost:4200/reset-pass/' + codeRecovery;
      await strapi.query('user', 'users-permissions').update({ id: user.id }, { codeRecovery });

        const mailjet = require("node-mailjet").connect(
          "9601daa407b47b0c9f0b8632781a94da",
          "c2bf5d2cc75c809e27cd0635a1f540a6"
        );
        const request = mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: {
                Email: "jefer.ramirezjrt@hotmail.com",
                Name: "jeff",
              },
              To: [
                {
                  Email: userEmail,
                  Name: "jeff",
                },
              ],
              Subject: "Reset password emprende con exito.",
              TextPart: "usuario",
              HTMLPart:
              `<h3>Para resetear el password navegue al siguiente link <a href='${url}'>Emprende</a>!</h3><br />`,
              CustomID: "",
            },
          ],
        });

        try {
          const result =  await request;
          ctx.send({ code: 200, status: true });
        } catch (error) {
          ctx.send({ code: 400, status: false });
        }

      }
  },

};
