# Express API Project

This is an API using Express. The API is getting data from a database consisting of information about movies and TV shows from Netflix. To help you out, there are some RESTful endpoints that together with queries can list different types of data. 


## Documentation

To list both movies and TV shows
/all

To list movies
/movies

To list TV shows.
/tv-shows

To return a movie or tv show that matches an id
/id:id
Example: /id/2018

To list all titles
/titles

To get a list of titles matching a keyword
/titles?title={keyword}
Example: /titles?title=Love

To get a list of directors
/directors

To list movies and TV shows from a specific director
/directors/:director/all
Example: /directors/Scorsese/all

To list movies and TV shows from a specific country
/countries?country={country}
Example: /countries?country=France

To list movies and TV shows released in a specific year
/release?year={year}
Example: /release?year=2018


## View it live

https://project-expressapi.herokuapp.com/
