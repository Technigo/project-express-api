# Express API Project

This project is my first backend-project using node.js and Express. The task was to create endpoints using Express for a REST-API using json data, returning both arrays of data and a single item.
For the project I used data about books and created an API with the following endpoints:

* Root: https://hanna-books-api.herokuapp.com/

Path-params:
* All books: https://hanna-books-api.herokuapp.com/books
* Books by specific author (not case-sesitive). Example: https://hanna-books-api.herokuapp.com/books/author/auster
* Books in a specific language (by language-code). Example: https://hanna-books-api.herokuapp.com/books/language/fre
* One book by id. Example: https://hanna-books-api.herokuapp.com/books/id/275
* One book by ISBN or ISBN13. Example: https://hanna-books-api.herokuapp.com/books/isbn/140097317
* List of top-rated 100 books: https://hanna-books-api.herokuapp.com/books/ratings/top100

Query-params:
* Query by title and/or author. Example: 
  Only author: https://hanna-books-api.herokuapp.com/books/?author=auster
  Only title: https://hanna-books-api.herokuapp.com/books/?title=moon
  Title and author: https://hanna-books-api.herokuapp.com/books/?title=moon&author=auster
* Pages. Example: https://hanna-books-api.herokuapp.com/books/?page=22
* Page size: the default pagesize is 20 books per page, but user can change it. Example: https://hanna-books-api.herokuapp.com/books/?page=22&pageSize=10


## The process

First I tried to imagine how a user would like to use this data and what kind of data the user would want to find, and based o the existing data, what could I make of it. Then I created endpoints from that. I also used the 'express list endpoints'-package for the user to be able to have an overview of existing endpoints. I used filter, find and slice-methods to get the desired data. I also created error-messages to show to the user when no data was found.
It wasn't always so easy to decide if the endpoint should be a query param or a path param.

## What I learned
- How to deploy to Heroku
- Understanding of what node-js and express is and how to work with them.
- Knowledge on how to create routes using Express.
- Better understanding of what a RESTful-API is.
- Understanding of the process of deciding how to structure an API and deciding which endpoints it should include, based on existing data and desired usage on the front-end.
- Understanding of the difference between a path-param and a query-param.
- A better overall understanding of how front-end and back-end depend on each other and what can/should best be done on each end.
- A better understanding of the backend-capabilities of Javascript.

If I had more time I would like to also build a front-end for this API which uses the data and shows it in a nice way to the user. 

## View it live

https://hanna-books-api.herokuapp.com/
