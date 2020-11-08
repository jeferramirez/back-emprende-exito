module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host:  env('DATABASE_HOST', 's554ongw9quh1xjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'b89ha6212by15wf5'),
        username: env('DATABASE_USERNAME', 'vipt5fdktu0urn7i'),
        password: env('DATABASE_PASSWORD', 'yzv3z2p0tr2cdrd7'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
