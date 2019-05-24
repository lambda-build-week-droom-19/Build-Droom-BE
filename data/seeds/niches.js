
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('niches').del()
    .then(function () {
      // Inserts seed entries
      return knex('niches').insert([
        { id: 1, niche: 'Software Engineer' },
        { id: 2, niche: 'Sales' },
        { id: 3, niche: 'Warehouse' }
      ]);
    });
};
