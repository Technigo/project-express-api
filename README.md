# Express API Project

This is an API using Express. The API is getting data from a database consisting of information about movies and TV shows from Netflix. To help you out, there are some RESTful endpoints that together with queries can list different types of data. 


## Documentation

To list both movies and TV shows<br>
/all

To list movies<br>
/movies

To list TV shows<br>
/tv-shows

To return a movie or tv show that matches an id<br>
/id:id<br>
Example: /id/2018

To list all titles<br>
/titles

To get a list of titles matching a keyword<br>
/titles?title={keyword}<br>
Example: /titles?title=Love

To get a list of directors<br>
/directors

To list movies and TV shows from a specific director<br>
/directors/:director/all<br>
Example: /directors/Scorsese/all

To list movies and TV shows from a specific country<br>
/countries?country={country}<br>
Example: /countries?country=France

To list movies and TV shows released in a specific year<br>
/release?year={year}<br>
Example: /release?year=2018


## View it live

https://project-expressapi.herokuapp.com/
