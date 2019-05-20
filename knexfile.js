
module.exports = {

  development: {
    client: 'sqlite3',
    connection: './data/droom.db3',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: './data/droom.db3',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    useNullAsDefault: true
  },

};
