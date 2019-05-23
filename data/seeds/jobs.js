
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {
          id: 1,
          user_id: 1,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          location: 'location',
          pay_type: 'pay_type',
          starting_pay: 'starting_pay',
          education: 'education',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          appliers: JSON.stringify([
            4, 5
          ]),
          confirmed: JSON.stringify([
            4
          ]),
          niche: 1,
          seen: false
        },
        {
          id: 2,
          user_id: 2,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 3,
          user_id: 3,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 4,
          user_id: 1,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 5,
          user_id: 1,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 6,
          user_id: 2,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 7,
          user_id: 3,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 8,
          user_id: 2,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 9,
          user_id: 3,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
        {
          id: 10,
          user_id: 1,
          job_title: 'job_title',
          start_date: 'start_date',
          job_type: 'job_type',
          pay_type: 'pay_type',
          location: 'location',
          starting_pay: 'starting_pay',
          description: 'description',
          responsibilities: JSON.stringify(['first', 'second', 'third']),
          required_skills: JSON.stringify(['required_skills', 'required_skills', 'required_skills']),
          niche: 1,
          seen: false
        },
      ]);
    });
};
