
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('emprofiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('emprofiles').insert([
        {
          id: 1,
          employer_id: 1,
          name: 'Lambda School',
          about: 'We are the people that make the learning happen for code stuff',
          contact_info: JSON.stringify({
            phone: '1234567890',
            email: 'lambda@lambda.com'
          }),
          social_media: JSON.stringify([
            'http://facebook.com/LambdaSchoolOnline'
          ]),
          website: 'http://lambdaschool.com'
        },
      ])
    });
};
