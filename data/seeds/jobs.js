
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {
          id: 1,
          user_id: 1,
          job_title: 'Junior Front-End Developer',
          location: 'Los Angeles, CA',
          requirements: 'React, Redux, CSS',
          niche: 1,
          seen: false
        },
        {
          id: 2,
          user_id: 2,
          job_title: 'Bookseller',
          location: 'Los Angeles, CA',
          requirements: 'Sales, Customer Service',
          niche: 2,
          seen: false
        },
        {
          id: 3,
          user_id: 3,
          job_title: 'Store Stocking',
          location: 'Los Angeles, CA',
          requirements: 'Organization',
          niche: 3,
          seen: false
        },
        {
          id: 4,
          user_id: 1,
          job_title: 'Junior UI Developer',
          location: 'Los Angeles, CA',
          requirements: 'HTML, CSS',
          niche: 1,
          seen: false
        },
        {
          id: 5,
          user_id: 1,
          job_title: 'Senior Back End Developer',
          location: 'Los Angeles, CA',
          requirements: 'node',
          niche: 1,
          seen: false
        },
        {
          id: 6,
          user_id: 2,
          job_title: 'Customer Service Representative',
          location: 'Seattle, WA',
          requirements: 'node',
          niche: 2,
          seen: false
        },
        {
          id: 7,
          user_id: 3,
          job_title: 'Warehouse Manager',
          location: 'San Francisco, CA',
          requirements: '2+ years Mangaement Experience',
          niche: 3,
          seen: false
        },
        {
          id: 8,
          user_id: 2,
          job_title: 'Floor Manager',
          location: 'Houston, TX',
          requirements: '5+ years experience in field',
          niche: 2,
          seen: false
        },
        {
          id: 9,
          user_id: 3,
          job_title: 'Truck Driver',
          location: 'Miami, FL',
          requirements: 'CDL',
          niche: 3,
          seen: false
        },
        {
          id: 10,
          user_id: 1,
          job_title: 'Senior Front End Developer',
          location: 'Los Angeles, CA',
          requirements: 'node',
          niche: 1,
          seen: false
        },
      ]);
    });
};
