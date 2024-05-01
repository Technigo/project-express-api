# Project Express API

This project is a basic Express.js application that serves as a book information API. It allows users to look up books, find books by specific authors, and see a list of top-rated books. It's a straightforward tool aimed at making book data easily accessible.

## The problem

In working on this project, I faced a practical challenge in organizing the routes correctly. Specifically, both authors and books were being accessed through the same /books route, and I would get errors. Figuring out how to separate these two functionalities within the same path was a bit tricky. I still don't quite understand why we solved it the way we did as I was collaborating with someone else. This experience taught me a lot about organizing a web project in a way that makes sense and is easy to navigate, I do however struggle a bit with understanding how I am meant to use it moving forward in other projects.

Updated: I struggeled with this one, more than with the mongo-api for some reason. I think it meets all the requirements now. I think it works the way it should. 

## View it live

https://ec-express-api-books.onrender.com 

URL: /
- Displays API documentation.

URL: /books
- Lists all books.

URL: /books?author=AuthorName
- Shows books by a specific author. Replace 'AuthorName' with the author's name.

URL: /books/top?count=R
- Shows top rated books by average rating. Replace 'R' with a number (default is 5).

URL: /books/:title
- Retrieves a book that includes the specified substring in its title. Replace ':title' with the part of the book's title you are searching for. For example, /books/Harry Potter will return any book with 'Harry Potter' in the title.
