# Build-Droom-BE
Back End Repo <br />
TDD - https://docs.google.com/document/d/1Bt6ERPdgEIbC9VOFHJVD-C303JZIB7RgRu8QRsAJ9l0/edit#

### Base URL: `https://droom-bw.herokuapp.com/`

### Front End: `https://droom-app.netlify.com/`

# USER_TYPES: Job Seeker is a `1` and Employer is a `0`

## Endpoints

 ### Register/Login
 Method | Endpoint | Description 
 ------ | -------- | -----------
 POST | `/auth/register` | accepts `username`, `password`, and `user_type(0 for employer, 1 for seeker)`, creates a user on the `users` table, and returns the user's username, user_type, and token
 POST | `/auth/login` | accepts `username` and `password` and returns a message, user_type, and a token if username and passwords match

 #### Accepted Register/Login Schema
 ```
{
    username: string,
    password: string,
    user_type: integer(0 for seeker, 1 for employer)
}
 ```

### Users
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/users` | authorization(token) | Returns all users' username and id
GET | `/users/:id` | authorization(token) | Returns user's username and id

### Profiles

#### Employers
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/profile/employers` | authorization(token) | Returns all employer profiles
GET | `/profile/employer` | authorization(token) [if seeker, id(referring to employer)] | Returns employer's profile
POST | `/profile/employer` | authorization(token) | Adds and returns employer's profile
PUT | `/profile/employer` | authorization(token) | Returns updated employer
DELETE | `/profile/employer` | authorization(token) | Returns a message, indicating whether or not the delete succeeded

##### Accepted Employer Profile Schema
```
{
    name: string,
    location: string,
    about: string,
    contact_info: {
        phone: string,
        email: string
    },
    social_media: {
        facebook: string,
        linkedIn: string,
        twitter: string,
        github: string
    },
    website: string
}
```

#### Seekers
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/profile/seekers` | authorization(token) | Returns all seeker profiles
GET | `/profile/seeker` | authorization(token) [if employer, id(referring to seeker)] | Returns seeker's profile
POST | `/profile/seeker` | authorization(token) | Adds and returns seeker's profile
PUT | `/profile/seeker` | authorization(token) | Returns updated profile
DELETE | `/profile/seeker` | authorization(token) | Returns a message, indicating whether or not the delete succeeded

##### Accepted Seeker Profile Schema
```
{
    first_name: string, 
    last_name: string, 
    position: string,
    location: string, 
    bio: string, 
    job_type: string,
    contact_info: {
        phone_number: string,
        email: string
    },
    interests: [array of interests],
    past_experience: [ array of:
        {
            name: string,
            title: string,
            description: string
        }
    ], 
    education: [
        {
            school: string,
            certificate: string
        }
    ],
    skills: [array of skills],
    references: [ array of:
        {
            name: string,
            relationship: string,
            phone: string,
            email: string
        }
    ],
    social_media: {
        facebook: string,
        linkedIn: string,
        twitter: string,
        github: string
    },
    portfolio: string,
    resume: string,
    projects: [array of urls],
    niche: integer(references niche id), 
    seen: [array of job ids that have been seen by user], 
    timestamp: string 
}
```

### Niches
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/niches` | none | Returns a list of niches
POST | `/niches` | authorization(token) | Adds niche and returns `{id, niche}`
GET | `/niches/employers/:niche_id` | authorization(token) | Returns all employers with niche
PUT | `/niches/seekers/:niche_id` | authorization(token) | Returns all seekers with niche

#### Niche Schema
```
{
    id: integer,
    niche: string
}
```

### Jobs
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/jobs` | none | Returns a list of jobs
GET | `/jobs/:id` | none | Returns job with id
POST | `/jobs` | authorization(token) | returns created job
PUT | `/jobs/:id` | authorization(token) | returns updated job
DELETE | `/jobs/:id` | authorization(token) | returns whether or not the job has been deleted
GET | `/jobs/matches/employer` | authorization(token) | returns list of matches for each job by that employer
GET | `/jobs/matches/seeker` | authorization(token) | returns list of jobs seeker has not seen
GET | `/jobs/matches/job/:job_id` | authorization(token) | returns list of available and confirmed seekers for job_id
GET | `/jobs/employer/:id` | none | returns jobs associated with employer's id

#### Accepted Job Schema
```
{ 
    job_title: string, 
    start_date: string,
    job_type: string(part-time, full-time, seasonal),
    pay_type: string, 
    starting_pay: string,
    education: string,
    description: string,
    responsibilities: [array of responsibilites],
    required_skills: [array of skills],
    appliers: [array of seeker user_ids that have said yes],
    confirmed: [array of seeker user_ids that are confirmed by employer],
    niche: integer(references niche id), 
    seen: boolean,
}
```

#### Returned Schema for `/jobs/matches/employer`
```
{
  job: {
    title: job_title,
    id: job id
  },
  usersAvailable: [ Array of:
    { User(s) that expressed interest in job
      user_id: user_id,
      first_name: user's first_name,
      last_name: user's last_name,
      position: user's position,
      location: user's location
    }
  ],
  usersConfirmed: [ Array of:
    { User(s) the company has approved
      user_id: user_id,
      first_name: user's first_name,
      last_name: user's last_name,
      position: user's position,
      location: user's location
    }
  ]
}
```
