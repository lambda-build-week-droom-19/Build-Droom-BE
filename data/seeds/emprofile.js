
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('emprofiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('emprofiles')
    });
};
