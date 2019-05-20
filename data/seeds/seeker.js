const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('seeker').del()
    .then(function () {
      // Inserts seed entries
      return knex('seeker').insert([
        { id: 1, username: 'seeker1', password: `${bcrypt.hashSync('something1', 10)}` },
        { id: 2, username: 'seeker2', password: `${bcrypt.hashSync('something2', 10)}` },
        { id: 3, username: 'seeker3', password: `${bcrypt.hashSync('something3', 10)}` }
      ]);
    });
};
