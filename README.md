# Express API Project
An API with data about Netflix shows and movies made with Express. The API has different routes for shows and movies.

## The problem
The JSON for the API included both data about Netflix shows and movies. To make it easier for someone to use the data I wanted to make separate routes for these entertainment types.

I started with looking at what keys and values the JSON contained to figure out how to handle the data. I planned one route for all movies and one for all shows as well as routes for single results. I also wanted the users to be able to filter the data based on country; I added country as a possible query for the movies and shows routes. For shows I also wanted to give the user the oppurtunity to filter shows based on how many seasons they have; I added seasons as a query.

For the single results pages I added a 404 response message if the movie/show was not found.

If I had more time I would also limit the results from the API by using slice.
I would also add a filter for genre for both shows and movies.

## Tech and skills
* Express
* JavaScript

## View it live
* [Live start route](https://express-entertainment.herokuapp.com/)

* [Live start movies route](https://express-entertainment.herokuapp.com/movies)

* [Live start shows route](https://express-entertainment.herokuapp.com/movies)
