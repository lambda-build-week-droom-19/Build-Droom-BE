const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'user1', password: `${bcrypt.hashSync('something1', 10)}`, user_type: 0 },
        { id: 2, username: 'user2', password: `${bcrypt.hashSync('something2', 10)}`, user_type: 0 },
        { id: 3, username: 'user3', password: `${bcrypt.hashSync('something3', 10)}`, user_type: 0 },
        { id: 4, username: 'seeker1', password: `${bcrypt.hashSync('something1', 10)}`, user_type: 1 },
        { id: 5, username: 'seeker2', password: `${bcrypt.hashSync('something2', 10)}`, user_type: 1 },
        { id: 6, username: 'seeker3', password: `${bcrypt.hashSync('something3', 10)}`, user_type: 1 }
      ]);
    });
};
