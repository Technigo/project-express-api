# Express API Project

This week's project is the first in my backend journey🥇. An API created using express.The RESTful endpoints created returns data from a hard coded data set about books, such as authors, title, number of pages and books id.

## The built and challanges

Usig a hard-coded set of data, stored as a JSON file "books.json", which includes 500 book reviews objects. Then I created API endpoints in server.js file along with array methods such as filter() .find() and Slice() to select, filter, or limit the items returned in my responses.

The difficulty an discussions I had was weather to use query or params to return more than a single item, or an array of data.

The endpoints inclueded so far are:

✅ http://localhost:8080/
Main root is '/' = here you can view all endpoints set up

✅ http://localhost:8080/books
All books

✅ http://localhost:8080/books?author={author}
Query that returns an array of data including specified authors

✅ http://localhost:8080/books?title={title}
Query that returns an array of data including specified title

✅http://localhost:8080/books/book/{id}
Param {id} to return only a single item a single book.

✅http://localhost:8080/books/top-rated
End point for top 10 rated books

✅http://localhost:8080/books/pages
End point that return all books sorted in number of pages

✅http://localhost:8080/books/pages/ {pageCount}
Param {PagesCount} that returns one single book that maches the amount of pages specified

👉I aim to also include pagnation, so I can limit amount of books, rendered per page.
If i had more time I would also include making my own data set. And also develop a fronend application. Which i have started on but not yet finished

### Tech ⚛️

👉Express
👉Node.js
👉JavaScript

#### View it live

Backend deployed here
https://saras-books.herokuapp.com/books

