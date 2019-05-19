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
 POST | `/auth/seeker/login` | accepts `username` and `password` and returns a message and a token if username and passwords match (on `seekers` table)
 POST | `/auth/employer/login` | accepts `username` and `password` and returns a message and a token if username and passwords match (on `employer` table)

### User
Method | Endpoint | Headers | Description
------ | -------- | ------- | -----------
GET | `/users/seeker` | authorization(token) and id(user) | Returns seeker's username and id
GET | `/users/employer` | authorization(token) and id(user) | Returns employer's username and id
