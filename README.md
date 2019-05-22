# Build-Droom-BE
Back End Repo <br />
TDD - https://docs.google.com/document/d/1Bt6ERPdgEIbC9VOFHJVD-C303JZIB7RgRu8QRsAJ9l0/edit#

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
GET | `/profile/employer` | authorization(token) | Returns employer's profile
POST | `/profile/employer` | authorization(token) | Adds and returns employer's profile
PUT | `/profile/employer` | authorization(token) | Returns updated employer
DELETE | `/profile/employer` | authorization(token) | Returns a message, indicating whether or not the delete succeeded

##### Accepted Employer Profile Schema
```
{
    name: string,
    about: string,
    contact_info: {
        phone_number: string,
        email: string
    },
    social_media: {object of social media},
    website: string
}
```

#### Seekers
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/profile/seekers` | authorization(token) | Returns all seeker profiles
GET | `/profile/seeker` | authorization(token) | Returns seeker's profile
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
    social_media: {object of social media},
    portfolio: string,
    resume: string,
    projects: [array of urls],
    niche: integer(references niche id), 
    seen: boolean, 
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

#### Accepted Job Schema
```
{ 
    job_title: string, 
    pay_type: string, 
    starting_pay: string,
    description: string,
    responsibilities: [array of responsibilites],
    required_skills: [array of skills],
    appliers: [array of seeker user_ids that have said yes],
    confirmed: [array of seeker user_ids that are confirmed by employer],
    niche: integer(references niche id), 
    seen: boolean,
}
```
