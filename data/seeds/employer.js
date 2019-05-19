const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('employer').del()
    .then(function () {
      // Inserts seed entries
      return knex('employer').insert([
        { id: 1, username: 'user1', password: `${bcrypt.hashSync('something1', 10)}` },
        { id: 2, username: 'user2', password: `${bcrypt.hashSync('something2', 10)}` },
        { id: 3, username: 'user3', password: `${bcrypt.hashSync('something3', 10)}` }
      ]);
    });
};
