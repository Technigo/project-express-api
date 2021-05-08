# Express API Project

This project's goal is to create my first RESTful API using Node in Express.


## The problem

I decided to work with a hardcoded dataset in JSON format with a list of over 1000 movies and their details.

The first challenge was to understand when to use path params and when query params. I did some experimenting and ended up using query params to filter movie list by title, cast, realease year and country. I created different endpoints by manipulating the data with JavaScript methods like: slice(), filter(), find(), includes(), map(). And I used path params to list possible options of movie types and also to filter movies by id. I also learned how to respond with 404 Error messages when a request yields no results. 

I also created a Frontend for this project so that I could see my API in action and test it out. 

It was a great learning experience having built both the Backend and Frontend of a project for the first time.

## View it live

Netflix Movies API live in Heroku: https://netflix-movie-data.herokuapp.com/movies

Frontend repository: https://github.com/Irina-web-dev/netflix-titles

And a Live website using this API here: https://focused-brahmagupta-68bd22.netlify.app
