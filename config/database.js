module.exports = ({ env }) => ({
  defaultConnection: 'mongo',
  connections: {
    mongo: {
      database: 'nodes',
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI'),
      },
      options: {
        ssl: true,
        debug: true
      },
    },
  },
});
