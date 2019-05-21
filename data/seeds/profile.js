
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('profile').del()
    .then(function () {
      // Inserts seed entries
      return knex('profile').insert([
        {
          id: 1,
          user_id: 4,
          first_name: 'John',
          last_name: 'Doe',
          location: 'Los Angeles, CA',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur a lacus et iaculis. Duis pretium dictum diam in rutrum.',
          past_experience: JSON.stringify([
            {
              name: 'somewhere',
              title: 'something',
              description: 'ja;lsdfjpoiarwnppaoierngoiadpsfhpafnbpashdpfa jsdpaiosdn iouasdpias bdfoiuahsdpfo apiduhvpaijgn oaiugfher'
            },
            {
              name: 'bartender',
              title: 'somebody',
              description: 'a;lskdjfnpoiaerngpoahejfpo apoigj paosidhfjnpoa sidhfpoiaw jpfohoi'
            }
          ]),
          interests: JSON.stringify(['Javascript', 'CSS']),
          niche: 1,
          seen: false
        },
        {
          id: 2,
          user_id: 5,
          first_name: 'Jane',
          last_name: 'Doe',
          location: 'Houston, TX',
          bio: 'Proin ante urna, pharetra vitae egestas vel, posuere elementum mi. Quisque nec egestas felis. In laoreet blandit turpis, eu fermentum massa porta a.',
          past_experience: JSON.stringify([
            {
              name: 'somewhere',
              title: 'something',
              description: 'ja;lsdfjpoiarwnppaoierngoiadpsfhpafnbpashdpfa jsdpaiosdn iouasdpias bdfoiuahsdpfo apiduhvpaijgn oaiugfher'
            },
            {
              name: 'bartender',
              title: 'somebody',
              description: 'a;lskdjfnpoiaerngpoahejfpo apoigj paosidhfjnpoa sidhfpoiaw jpfohoi'
            }
          ]),
          interests: JSON.stringify(['Javascript', 'CSS']),
          niche: 2,
          seen: false
        },
        {
          id: 3,
          user_id: 6,
          first_name: 'Tyler',
          last_name: 'Farmer',
          location: 'New York City, NY',
          bio: 'Fusce rutrum blandit mattis. Aliquam sapien neque, faucibus a nibh eu, cursus tincidunt risus. Quisque efficitur nec dui et tristique. Etiam pretium in velit vel dictum. Aenean pulvinar purus ut maximus viverra.',
          past_experience: JSON.stringify([
            {
              name: 'somewhere',
              title: 'something',
              description: 'ja;lsdfjpoiarwnppaoierngoiadpsfhpafnbpashdpfa jsdpaiosdn iouasdpias bdfoiuahsdpfo apiduhvpaijgn oaiugfher'
            },
            {
              name: 'bartender',
              title: 'somebody',
              description: 'a;lskdjfnpoiaerngpoahejfpo apoigj paosidhfjnpoa sidhfpoiaw jpfohoi'
            }
          ]),
          interests: JSON.stringify(['Javascript', 'CSS']),
          niche: 3,
          seen: false
        },
      ]);
    });
};
