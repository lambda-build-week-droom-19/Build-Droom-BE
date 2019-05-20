# Build-Droom-BE
Back End Repo <br />
TDD - https://docs.google.com/document/d/1Bt6ERPdgEIbC9VOFHJVD-C303JZIB7RgRu8QRsAJ9l0/edit#

## Endpoints

 ### Register/Login
 Method | Endpoint | Description 
 ------ | -------- | -----------
 POST | `/auth/register` | accepts `username`, `password`, and `user_type(0 for employer, 1 for seeker)`, creates a user on the `users` table, and returns the user's username and id
 POST | `/auth/login` | accepts `username` and `password` and returns a message, id, user_type, and a token if username and passwords match

### Users
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/users` | authorization(token) and id(user) | Returns all users' username and id
GET | `/users/:id` | authorization(token) and id(user) | Returns user's username and id

### Profile
Method | Endpoint | Headers | Description | Schema
------ | -------- | ------- | ----------- | ------
GET | `/profile/jobs` | authorization(token) | Returns all employer profiles | none
GET | `/profile/job` | authorization(token) and id(user) | Returns employer's profile | none
POST | `/profile/job` | authorization(token) and id(user) | Adds and returns employer's profile | { **employer_id**: integer(references seeker id), **first_name**: string, **last_name**: string, **location**: string, **bio**: string, **past_experience**: string, **interests**: string, **niche**: integer(references niche id), **seen**: boolean, **timestamp**: string }
PUT | `/profile/seeker` | authorization(token) and id | Returns updated profile | updates
GET | `/profile/seekers` | authorization(token) | Returns all seeker profiles | none
GET | `/profile/seeker` | authorization(token) and id(user) | Returns seeker's profile | none
POST | `/profile/seeker` | authorization(token) and id(user) | Adds and returns seeker's profile | { **seeker_id**: integer(references employer id), **job_title**: string, **location**: string, **requirements**: string, **niche**: integer(references niche id), **seen**: boolean }
PUT | `/profile/job` | authorization(token) and id | Returns updated job | updates

### Niches
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/niches` | none | Returns a list of niches
POST | `/niches` | authorization(token) | Adds niche and returns {id, niche}
GET | `/niches/employers/:niche_id` | authorization(token) | Returns all employers with niche
PUT | `/niches/seekers/:niche_id` | authorization(token) | Returns all seekers with niche
