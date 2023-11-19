# Project Express API

Week 13 project at Technigo (first week of getting to know the backend). Creating an API using Express with RESTful endpoints.


## The problem

Course material and ChatGPT was used as well as discussing within our team.

Next step would be to use the API building a frontend project. I decided to focus on and spending time on backend going through more material to learn more.

## View it live

https://first-express-api-l78k.onrender.com/

Endpoints
"/" Returns documentation of API
"/books" Returns an array of all books
"/books/:bookID" Returns Returns a single book

To get a list of books with optional filtering
/books
    query params:
        "title" Filter books by title
        "authors" Filters books by author/s

Example: "/books?authors=J.K.%20Rowling&title=Half-Blood"