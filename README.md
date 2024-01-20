# Project Express API

This project is a basic Express.js application that serves as a book information API. Through the routes, the user can look up (get) books, books by author, books by title, and see a list of top-rated books. 

## The problem

I faced a  challenge in organizing the routes correctly. Specifically, both authors and books were being accessed through the same /books route, and I would get errors. Figuring out how to separate these two functionalities within the same path was a bit tricky. I still don't quite understand why we solved it the way we did as I was collaborating with someone else. This experience taught me a lot about organizing a web project in a way that makes sense and is easy to navigate.

## View it live

https://mc-express-api.onrender.com/

## Routes

URL: /
- Displays API documentation.

URL: /books
- Lists all books.

URL: /books?author=AuthorName
- Shows books by a specific author. Replace 'AuthorName' with the author's name. Do not need the whole name to get results.

URL: /books/top?count=R
- Shows top rated books by average rating. Replace 'R' with a number (default is 5).

URL: /books/:title
- Retrieves a book that includes the specified substring in its title. Replace ':title' with the part of the book's title you are searching for. (!) Only returns one book.