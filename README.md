# Express API Project - Let's go Backend!

In this week's project it was time to leave the frontend and take a look at the backend. I have built my first API in Node using Express.

It's a book API with these endpoints:

* Root: /
* Books: /books
* Books top 20 rated: /books/top-20-rated 
* Book by id: /books/:id
* Authors: /authors

## What I have learnt

* How to install and setup an Express server
* How to create my first routes
* How to filtering a data set into arrays by manipulate date in Javascript (or find a specific item in the data set)
* How to deploy Node projects at Heroku

## The process and structure

I decided to use the data set of books (books.json) that was provided by Technigo.

Started off by doing the **BLUE LEVEL** and extended my API with things from red and black level.

🔴 Single item, handle when the item doesn't exist and return some useful data in the response.

🔴 Filters via query parameters to filter the data you return from endpoints which return an array of data.

⚫ Pagination by using `.slice()` to return only a selection of results from the array. You could then use a query parameter to allow the client to ask for the next 'page'.



### Core Tech

* Express
* express-list-endpoints
* Heroku
* Postman
* Javscript

## View it live

[Book API by Ylva at Heroku](https://book-api-by-ylva.herokuapp.com/)
