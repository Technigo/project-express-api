# Express API Project

This is a simple RESTful API application made with Express and documented with Swagger.

## Tech Stack: Node.js, Express.js, JS, & documentation with Swagger

## Features

GET:

- all books data http://localhost:8080/books
- books by author or/and title or/and language http://localhost:8080/books?author={smth}&title={smth}&lang[]=en-GB&lang[]=en-US
  **_author & title search supports a partial match and is not case sensitive_**
- single item by id (/books/:id)
- search by rating. Returns a direct match and other close matching results. (/ratings/:rating)
- most popular books (/popular)
- most popular kids-friendly books (/popular?kids_friendly=true)

POST:

- provide a new rate to affect books rating score
  **_doesn't save to physical file/database so changes wont survive reload. U can view and test it in Postman_**

## View it live

https://mary-snopok-books-open-api.herokuapp.com/
