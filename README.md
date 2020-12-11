# Express API Project

This is a backend project where I have created some RESTful endpoints of a Netflix API using Express.

## The problem

To be able to know what endpoints to create it is important to analyse the data and see what can be useful in the frontend. Here I got to practice some Javascript methods like filter, find and inlcudes to retrieve relevant data. Next step would be to use the data and build a website displaying the data to connect the backend with the frontend.

## View it live

All movies and TV Shows from the API:
https://express-moviestvshows-api.herokuapp.com/shows

A list of all the Netlix titles:
https://express-moviestvshows-api.herokuapp.com/shows/titles

All objects (movies and tv-shows) with the release date from a specific year:
https://express-moviestvshows-api.herokuapp.com/shows/year/2017

One object with a specific id:
https://express-moviestvshows-api.herokuapp.com/shows/id/81063129

Movies and TV shows from a specified country:
https://express-moviestvshows-api.herokuapp.com/shows/country/Japan

Shows movies and tv-shows from a specified genre. If you write for example Comedies you will also get results where many different genres are listed for the same movie/show. It also works to write comedies (lowercase c) or even only part of a word like comed.
https://express-moviestvshows-api.herokuapp.com/shows/genre/comedies


Similar to the one above but here you will only get the movies/shows which is defined with only one genre, for example Comedies (but has to be written exactly like that).
https://express-moviestvshows-api.herokuapp.com/genre/Comedies


Here we can query a movie/show title. We can use the query method since several movies/shows can have the same name.
https://express-moviestvshows-api.herokuapp.com/shows/title?title=Chocolate

Two params are used to return movies that are of the type "Movie" or"TV Show" and from a specified year.
https://express-moviestvshows-api.herokuapp.com/shows/2012/type/Movie

You get an error message if you type a year where there is no movies from, for example: 
https://express-moviestvshows-api.herokuapp.com/shows/1945/type/Movie
