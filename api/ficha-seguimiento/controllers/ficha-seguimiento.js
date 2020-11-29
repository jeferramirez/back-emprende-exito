'use strict';

//
module.exports = {
  async perfilUser(ctx) {
    const { idUser } = ctx.params;
    return await strapi
    .query('ficha-seguimiento')
    .find({ users_permissions_user: idUser }, ['users_permissions_user']);
    },

    async sendmail(ctx) {

      // validar que recibe email
      const mailjet = require ('node-mailjet')
      .connect('9601daa407b47b0c9f0b8632781a94da', 'c2bf5d2cc75c809e27cd0635a1f540a6')
      const request = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages":[
          {
            "From": {
              "Email": "jefer.ramirezjrt@hotmail.com",
              "Name": "jeff"
            },
            "To": [
              {
                "Email": "macs0330@gmail.com",
                "Name": "jeff"
              }
            ],
            "Subject": "Greetings from Mailjet.",
            "TextPart": "My first Mailjet email",
            "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
            "CustomID": "AppGettingStartedTest"
          }
        ]
      })
      request
        .then((result) => {
          console.log(result.body)
        })
        .catch((err) => {
          console.log(err.statusCode)
        })

    }


};
