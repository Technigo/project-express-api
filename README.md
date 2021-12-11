# Express API Project

This is my first project setting up an Express server and creating an API that handles a dataset of Netflix-shows.

## The problem

I started by analyzing the given Netflix-dataset and thinking about how I want to structure the routes, I will provide. I went for the following: 
- '/' - start
- '/endpoints' - provides all endpoints
- '/countries' - provides a sorted list of all countries that are in netflixData
- '/countries/:country' - route with all shows (both movies and other) from the provided country
- '/movies' - provides all movies and has the possibility to query for director, year and actor. You can also do pagination by setting page & limit as query parameters
- '/movies/id/:id' - provides one movie by ID
- '/movies/title/:title' - provides movies by name (can return more than one movie, if the provided parts of the title match with several movies)

Learnings:
- How to install and setup an Express server.
- How to deploy Node projects.
- How to build an API in Node using Express
- How to create routes in Express
- Practice data manipulation in JavaScript - selecting, filtering, and limiting arrays
- Practice pagination
- using req.params and req.query
- HTTP status codes
- API documentation with Postman

If I would have more time, I'd build a frontend.

## View it live

Visit my project: https://nehrwein-netflix-api.herokuapp.com/
Read the documentation: https://documenter.getpostman.com/view/18068162/UVR4PW9m
