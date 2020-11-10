module.exports = ({ env }) => ({

  host: env('HOST'),
  port: env.int('PORT'),
  admin: {
    url: '/dashboard',
    auth: {
      secret: env('ADMIN_JWT_SECRET', '315149dc14528a4d9148b5133f232f56'),
    },
  },
});
