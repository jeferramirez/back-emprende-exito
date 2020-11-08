module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {

    auth: {
      secret: env('ADMIN_JWT_SECRET', '315149dc14528a4d9148b5133f232f56'),
    },
  },
});
