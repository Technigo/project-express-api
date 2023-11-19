# Project Express API

This project is a basic Express.js application that serves as a book information API. It allows users to look up books, find books by specific authors, and see a list of top-rated books. It's a straightforward tool aimed at making book data easily accessible.

## The problem

In working on this project, I faced a practical challenge in organizing the routes correctly. Specifically, both authors and books were being accessed through the same /books route, and I would get errors. Figuring out how to separate these two functionalities within the same path was a bit tricky. I still don't quite understand why we solved it the way we did as I was collaborating with someone else. This experience taught me a lot about organizing a web project in a way that makes sense and is easy to navigate, I do however struggle a bit with understanding how I am ment to use it moving forward in other projects.

## View it live

https://ec-express-api-books.onrender.com 

/books 
/books/8 (or any book id number) 
/books/title (replace title with the actual title of a book) 
/books?author=AuthorName (replace AuthorName with the actual author name) 
/books/top?count=5 (or any amount of top books you would like to see, 5 is default)