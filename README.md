<h1 align="center">
  <a href="https://wen-api-service.onrender.com/" alt="Wen's API service">
    <img src="https://i.postimg.cc/wMwt6NSY/WEN-API-SERVICE.png" alt="Site preview">
  </a>
</h1>

## Project Express API

This project utilises the express with node.js to create a backend that serves the purpose of GET API service. The following are 3 endpoints that are available:

1. "/": Display all the API endpoints and instruction on how to use them.
2. "/songs": Display all songs with the ability to filter in query params based on genre and artist.
3. "/songs/:songID: Display a single song based on the id in param

## The problem

- GET method: using app.get() method to handle the GET request on each endpoint.
- Middleware: using the default middlewares for cors and parsing the body plus custom middlewares for queryparams, method and error handling.
- express-list-endpoints: using this package to list all the routes and info.
- EJS: using EJS to render a front-end page for the homepage.

## View it live

https://wen-api-service.onrender.com/
