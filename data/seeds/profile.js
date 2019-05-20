
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('profile').del()
    .then(function () {
      // Inserts seed entries
      return knex('profile').insert([
        {
          seeker_id: 1,
          first_name: 'John',
          last_name: 'Doe',
          location: 'Los Angeles, CA',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur a lacus et iaculis. Duis pretium dictum diam in rutrum.',
          past_experience: 'Senior Developer at Lambda School',
          interests: 'Javascript',
          niche: 1,
          seen: false
        },
        {
          seeker_id: 2,
          first_name: 'Jane',
          last_name: 'Doe',
          location: 'Houston, TX',
          bio: 'Proin ante urna, pharetra vitae egestas vel, posuere elementum mi. Quisque nec egestas felis. In laoreet blandit turpis, eu fermentum massa porta a.',
          past_experience: '',
          interests: '',
          niche: 2,
          seen: false
        },
        {
          seeker_id: 3,
          first_name: 'Tyler',
          last_name: 'Farmer',
          location: 'New York City, NY',
          bio: 'Fusce rutrum blandit mattis. Aliquam sapien neque, faucibus a nibh eu, cursus tincidunt risus. Quisque efficitur nec dui et tristique. Etiam pretium in velit vel dictum. Aenean pulvinar purus ut maximus viverra.',
          past_experience: '',
          interests: '',
          niche: 3,
          seen: false
        },
      ]);
    });
};
