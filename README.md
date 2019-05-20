# Build-Droom-BE
Back End Repo <br />
TDD - https://docs.google.com/document/d/1Bt6ERPdgEIbC9VOFHJVD-C303JZIB7RgRu8QRsAJ9l0/edit#

## Endpoints

 ### Registration
 Method | Endpoint | Description 
 ------ | -------- | -----------
 POST | `/auth/seeker/register` | accepts `username` and `password`, creates a user on the `seekers` table, and returns the job seeker's username and id
 POST | `/auth/employer/register` | accepts `username` and `password`, creates a user on the `employer` table, and returns the employer's username and id

 ### Login
 Method | Endpoint | Description 
 ------ | -------- | -----------
 POST | `/auth/seeker/login` | accepts `username` and `password` and returns a message and a token if username and passwords match
 POST | `/auth/employer/login` | accepts `username` and `password` and returns a message and a token if username and passwords match

### Users
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/users/seeker` | authorization(token) and id(user) | Returns seeker's username and id
GET | `/users/employer` | authorization(token) and id(user) | Returns employer's username and id

### Profile
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/profile/employers` | authorization(token) | Returns all employer profiles
GET | `/profile/employer` | authorization(token) and id(user) | Returns employer's profile
POST | `/profile/employer` | authorization(token) and id(user) | Adds and returns employer's profile
GET | `/profile/seekers` | authorization(token) | Returns all seeker profiles
GET | `/profile/seeker` | authorization(token) and id(user) | Returns seeker's profile
POST | `/profile/seeker` | authorization(token) and id(user) | Adds and returns seeker's profile

### Niches
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/niches` | none | Returns a list of niches
POST | `/niches` | authorization(token) | Adds niche and returns {id, niche}
GET | `/niches/employers/:niche_id` | authorization(token) | Returns all employers with niche
GET | `/niches/seekers/:niche_id` | authorization(token) | Returns all seekers with niche
