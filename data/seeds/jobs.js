
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {
          employer_id: 1,
          job_title: 'Junior Front-End Developer',
          location: 'Los Angeles, CA',
          requirements: 'React, Redux, CSS',
          niche: 1
        },
        {
          employer_id: 2,
          job_title: 'Bookseller',
          location: 'Los Angeles, CA',
          requirements: 'Sales, Customer Service',
          niche: 2
        },
        {
          employer_id: 3,
          job_title: 'Store Stocking',
          location: 'Los Angeles, CA',
          requirements: 'Organization',
          niche: 3
        }
      ]);
    });
};
