# Express API Project

API built with Node.js and Express.js.
Data from a JSON-file and different routes and queries to sort and filter. 

Route | Description 
--- | ---
/ | Api information
/books | All books
/book/:id | Book details
/isbn/:isbn | Book details

Query | Description 
--- | ---
?author | Filter on authors name
?title | Filter on title
?language | Filter on language code
?minpages | Minimum number of pages
?maxpages | Maximum number of pages
?rating | Rating 0-5
?sort | Sort on author, title, pages or rating
?page | Result pagination
?results | Results per page

## Core Tech
* Express.js
* Postman
* Heruko
* Javascript ES6

## Screenshot
![Screenshot](screenshot.png)

## View it live
https://olle-api-books.herokuapp.com/