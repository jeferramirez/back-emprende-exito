"use strict";

const {uid} = require('uid')
//
module.exports = {
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
      const updateuser  = await strapi.query('user', 'users-permissions').update({ id: user.id }, { codeRecovery });

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
                "<h3>Para resetear el password navegue al siguiente link <a href='https://www.mailjet.com/'>Emprende</a>!</h3><br />",
              CustomID: "",
            },
          ],
        });
        request
          .then((result) => {
            ctx.send({ code: 200, status: true });
            console.log(result.body);
          })
          .catch((err) => {
            ctx.send({ code: 400, status: false });
            console.log(err.statusCode);
          });

      }

    // validar que recibe email
   /*

    */
  },
};
