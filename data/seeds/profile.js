
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('profile').del()
    .then(function () {
      // Inserts seed entries
      return knex('profile').insert([
        {
          id: 1,
          user_id: 4,
          first_name: 'first_name',
          last_name: 'last_name',
          position: 'position',
          location: 'location',
          bio: 'bio',
          job_type: 'job_type',
          contact_info: JSON.stringify({
            phone_number: 'phone_number',
            email: 'email'
          }),
          interests: JSON.stringify(['array', 'of', 'interests']),
          past_experience: JSON.stringify([
            {
              name: 'name',
              title: 'title',
              description: 'description'
            }
          ]),
          education: JSON.stringify([
            {
              school: 'school',
              certificate: 'certificate'
            },
            {
              school: 'school',
              certificate: 'certificate'
            }
          ]),
          skills: JSON.stringify(['skill', 'skill', 'skill']),
          references: JSON.stringify([
            {
              name: 'name',
              relationship: 'relationship',
              phone: 'phone',
              email: 'email'
            }
          ]),
          social_media: JSON.stringify({
            facebook: 'facebook',
            linkedIn: 'linkedIn',
            twitter: 'twitter',
            github: 'github'
          }),
          portfolio: 'portfolio',
          resume: 'resume',
          projects: JSON.stringify([
            'https://google.com',
            'https://facebook.com'
          ]),
          niche: 1,
          seen: JSON.stringify([1, 3]),
          timestamp: 'timestamp'
        },
        {
          id: 2,
          user_id: 5,
          first_name: 'first_name',
          last_name: 'last_name',
          position: 'position',
          location: 'location',
          bio: 'bio',
          job_type: 'job_type',
          contact_info: JSON.stringify({
            phone_number: 'phone_number',
            email: 'email'
          }),
          interests: JSON.stringify(['array', 'of', 'interests']),
          past_experience: JSON.stringify([
            {
              name: 'name',
              title: 'title',
              description: 'description'
            }
          ]),
          education: JSON.stringify([
            {
              school: 'school',
              certificate: 'certificate'
            },
            {
              school: 'school',
              certificate: 'certificate'
            }
          ]),
          skills: JSON.stringify(['skill', 'skill', 'skill']),
          references: JSON.stringify([
            {
              name: 'name',
              relationship: 'relationship',
              phone: 'phone',
              email: 'email'
            }
          ]),
          social_media: JSON.stringify({
            facebook: 'facebook',
            linkedIn: 'linkedIn',
            twitter: 'twitter',
            github: 'github'
          }),
          portfolio: 'portfolio',
          resume: 'resume',
          projects: JSON.stringify([
            'https://google.com',
            'https://facebook.com'
          ]),
          niche: 1,
          seen: JSON.stringify([1, 3]),
          timestamp: 'timestamp'
        },
        {
          id: 3,
          user_id: 6,
          first_name: 'first_name',
          last_name: 'last_name',
          position: 'position',
          location: 'location',
          bio: 'bio',
          job_type: 'job_type',
          contact_info: JSON.stringify({
            phone_number: 'phone_number',
            email: 'email'
          }),
          interests: JSON.stringify(['array', 'of', 'interests']),
          past_experience: JSON.stringify([
            {
              name: 'name',
              title: 'title',
              description: 'description'
            }
          ]),
          education: JSON.stringify([
            {
              school: 'school',
              certificate: 'certificate'
            },
            {
              school: 'school',
              certificate: 'certificate'
            }
          ]),
          skills: JSON.stringify(['skill', 'skill', 'skill']),
          references: JSON.stringify([
            {
              name: 'name',
              relationship: 'relationship',
              phone: 'phone',
              email: 'email'
            }
          ]),
          social_media: JSON.stringify({
            facebook: 'facebook',
            linkedIn: 'linkedIn',
            twitter: 'twitter',
            github: 'github'
          }),
          portfolio: 'portfolio',
          resume: 'resume',
          projects: JSON.stringify([
            'https://google.com',
            'https://facebook.com'
          ]),
          niche: 1,
          seen: JSON.stringify([1, 3]),
          timestamp: 'timestamp'
        },
      ]);
    });
};
