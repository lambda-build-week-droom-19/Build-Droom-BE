# Build-Droom-BE
Back End Repo <br />
TDD - https://docs.google.com/document/d/1Bt6ERPdgEIbC9VOFHJVD-C303JZIB7RgRu8QRsAJ9l0/edit#

## Endpoints

 ### Register/Login
 Method | Endpoint | Description 
 ------ | -------- | -----------
 POST | `/auth/register` | accepts `username`, `password`, and `user_type(0 for employer, 1 for seeker)`, creates a user on the `users` table, and returns the user's username, id, user_type, and token
 POST | `/auth/login` | accepts `username` and `password` and returns a message, id, user_type, and a token if username and passwords match

 #### Register/Login Schema
 ```
{
    username: string,
    password: string
}
 ```

### Users
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/users` | authorization(token) and id(user) | Returns all users' username and id
GET | `/users/:id` | authorization(token) and id(user) | Returns user's username and id

### Profiles

#### Employers
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/profile/employers` | authorization(token) | Returns all employer profiles
GET | `/profile/employer` | authorization(token) and id(user) | Returns employer's profile
POST | `/profile/employer` | authorization(token) and id(user) | Adds and returns employer's profile
PUT | `/profile/employer` | authorization(token) and id | Returns updated employer
DELETE | `/profile/employer` | authorization(token) and id(to be deleted) | Returns a message, indicating whether or not the delete succeeded

##### Employer Profile Schema
```
{
    id: integer,
    employer_id: integer(references employer id)
    name: string,
    about: string,
    contact_info: string,
    social_media: string,
    website: string
}
```

#### Seekers
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/profile/seekers` | authorization(token) | Returns all seeker profiles
GET | `/profile/seeker` | authorization(token) and id(user) | Returns seeker's profile
POST | `/profile/seeker` | authorization(token) and id(user) | Adds and returns seeker's profile
PUT | `/profile/seeker` | authorization(token) and id | Returns updated profile
DELETE | `/profile/seeker` | authorization(token) and id(to be deleted) | Returns a message, indicating whether or not the delete succeeded

##### Seeker Profile Schema
```
{
    seeker_id: integer(references seeker id), 
    first_name: string, 
    last_name: string, 
    location: string, 
    bio: string, 
    past_experience: string, 
    interests: string, 
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

### Jobs
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/jobs` | none | Returns a list of jobs
GET | `/job` | id | Returns a list of niches

#### Job Schema
```
{ 
    employer_id: integer(references employer id), 
    _title: string, 
    location: string, 
    requirements: string, 
    niche: integer(references niche id), 
    seen: boolean 
}
```
