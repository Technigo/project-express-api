# Express API Project

This week we began our journey into backend development. The project goal was to create our first **RESTful API** using **Express**. The API, which uses hard-coded set of data, stored as a JSON - should have a number of endpoints and using array methods should return both an array of all data and also individual objects.

## The problem

I created a /books route and wanted to implement pagination and allow the client to query the page number, and also the amount of results shown by page. I also included x2 query's which allow you to search by book author or book title thanks to **filter** and **includes** methods.

I added 404 status errors, and installed the Express List Endpoints libuary, so that my end points display to the user on the root page.

If I had more time I would of loved to have created a frontend so that I could show the data neatly on the client side.

Available endpoints:

- Root: /
- Books: /books
- Book by id: /books/:id
- Title: /books/booktitle
- Authors: /books/bookauthor

## Tech

- Node
- Express
- Express List Endpoints
- JavaScript
- Heroku
- Postman

## View it live

https://jamie-books-api.herokuapp.com/
