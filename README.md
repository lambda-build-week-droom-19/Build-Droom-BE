# Build-Droom-BE
Back End Repo <br />
TDD - https://docs.google.com/document/d/1Bt6ERPdgEIbC9VOFHJVD-C303JZIB7RgRu8QRsAJ9l0/edit#

## Endpoints

 ### Registration
 Endpoint | Description 
 -------- | -----------
 `/auth/seekers/register` | accepts `username` and `password`, creates a user on the `seekers` table, and returns the job seeker's username and id
 `/auth/employers/register` | accepts `username` and `password`, creates a user on the `employers` table, and returns the employer's username and id

 ### Login
 Endpoint | Description 
 -------- | -----------
 `/auth/seekers/login` | accepts `username` and `password` and returns a message and a token if username and passwords match (on `seekers` table)
 `/auth/employers/login` | accepts `username` and `password` and returns a message and a token if username and passwords match (on `employers` table)
