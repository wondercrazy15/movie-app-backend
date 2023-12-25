Movies-DB Node API
Documentation
Overview
The Movies-DB Node API is a backend application developed using Node.js and Express. It 
provides endpoints for managing movies and user authentication. This documentation outlines 
the available endpoints, their functionality, and usage.
Base URL
The base URL for the API is determined by the server running the application. By default, the 
server runs on  http://localhost:5001 , but you should replace this with the appropriate 
base URL if your server is hosted elsewhere.
Authentication
All endpoints, except for the registration ( /api/users/register ) and login 
( /api/users/login ) endpoints, require user authentication. To access these protected 
endpoints, you must include a valid authorization token in the request headers. The token is 
obtained by logging in via the  /api/users/login  endpoint.
Common Response from API 
if the status is success then the response will be
{ data : true, error: false}
and if the status if failure then the response will be 
{data: false, error: true}
Endpoints
1. Introduction
URL:  /
Method:  GET
Description: Provides information about the API, including its title, purpose, required 
authorization, and a list of available endpoints.
2. User Registration
URL:  /api/users/register
Method:  POST
Description: Registers a new user.
Request Body:
{
  "username": "example_user",
  "email": " example@gmail.com"
  "password": "example_password"
}
3. User Login
URL:  /api/users/login
Method:  POST
Description: Logs in an existing user and returns an authorization token.
Request Body:
{
   "email": "example@gmail.com", 
  "password": "example_password"
}
4. Get Current User
URL:  /api/users/current
Method:  GET
Description: Retrieves information about the currently authenticated user.
5. Add Movie
URL:  /api/movies/add
Method:  POST
Description: Adds a new movie to the database.
Request Body: 
{
  "title": "Example Movie",
  "poster": "URL of image",
  "publishingYear": "2023",
  "userId": "user_id"
}
6. Edit Movie
URL:  /api/movies/edit/:id
Method:  PUT
Description: Edits an existing movie.
Request Body:
{
  "title": "Updated Movie Title",
  "poster": "URL of image",
  "publishingYear": "2022"
}
7. List Movies
URL:  /api/movies/list/:userId
Method:  GET
Description: Retrieves a list of movies for a specific user.
Response Example: 
{
  "movies": [
    {
      "title": "Example Movie",
      "poster": "URL of image",
      "publishingYear": "2023",
    },
    {...}
  ]}
Error Handling
The API utilizes a centralized error handling middleware to manage errors uniformly. If an error 
occurs during a request, details about the error will be included in the response.
Conclusion
This documentation provides an overview of the Movies-DB Node API, its endpoints, and 
usage. Ensure proper authentication and follow the specified request formats for a seamless 
experience. If you encounter any issues or have questions, refer to this documentation or 
contact the API developers.