# Express API Project

This week's project starts of my backend journey by creating an API using Express. The API should have at least a couple of RESTful endpoints which return either an array of data, or a single item.

** Blue Level (Minimum Requirements) **

- Your API should have at least 2 routes. Try to push yourself to do more, though!
- A minimum of one endpoint to return a **collection** of results (array of elements)
- A minimum of one endpoint to return a **single** result (single element).
- Your API should be [RESTful]

## The problem

Based on prerecorded and live code sessions I implemented most of the lessons learned. I chose the books data and set up a few paths and queries. The assignment was relatively straight forward an no major hickups. For good use and implementation from frontend a solid ducumentation seems to be key.

Unsure if the console log for starting the server should be left in project?

<!-- Tried to implement more querys, for example
if (title) {
    booksToSend = booksToSend
      .filter(book => book.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
  } 
But couldn't get to work. Do not understand why since it is the same syntax as author? tried replacing title with another syntax but that didn't resolve anything... -->

## View it live

Heroku - https://th-project-express-api.herokuapp.com/

// sample routes
// https://th-project-express-api.herokuapp.com/books
// https://th-project-express-api.herokuapp.com/books/id/14
// https://th-project-express-api.herokuapp.com/books/isbn/61159174

// sample queries
// https://th-project-express-api.herokuapp.com/books?author=adams
// https://th-project-express-api.herokuapp.com/books?language_code=en-US
// https://th-project-express-api.herokuapp.com/books?author=adams&language_code=en-US


