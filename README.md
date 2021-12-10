# Express API Project

This is a backend project with a purpose to build an API with hardcoded data in a json-file. And create endpoints and using a RESTful approach. The Data used is data over netflix titles both movies and tv shows.

## Features

- /endpoints = a overview of the endpoints by imported express-list-endpoints
- /netflix-titles = returning the whole array or data avalible
- /netflix-titles/movies endpoint that returns only movie titles using filter
- /netflix-titles/tvshows endpoint that returns only tvshow titles using filter
- /netflix-titles/year/:year that makes it possible to search and filter the response total data array by a specific year
- /netflix-titles/show_id/:show_id that makes it possible to find a specific movie or tv show based on a unique show id
- /netflix-titles/title/:title that makes it possible to search for a title by a specific title through params
- /netflix-titles?title={title of the movie} endpoint that makes it possible to search title through query

## The production process

- the main issue I had was mostly typos and tiny things missing when something did not work for me. I had to read a lot of times and often it was a / missing or something like that, but often I found it quite fast.
- I did a lot of error tests typing in different things in the url
- if I had more time I would create a pagination.

## View it live

https://emelies-express-api.herokuapp.com/
