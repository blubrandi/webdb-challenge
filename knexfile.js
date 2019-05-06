// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/projects.db3' // the folder will be created when we run the migrations
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    // Enforces SQLite Foreign Keys, make sure to add!!
    pool: {
      afterCreate: (connection, done) => {
        connection.run('PRAGMA foreign_keys =ON', done);
      }
    }
  }
};