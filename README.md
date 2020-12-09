# Express API Project

Created my first API with Express.

## The problem

Spent some time with the data to understand what kind of API endpoints would make sense, whereafter I started creating the endpoints. Some of them were pretty straightforward, whilst some needed a lot of data analysis and testing in order to have meaningful filter functions. Example: make sure that when user types "HUDSON" when searching for a book title, "hudson:", and "(Hudson" should also be included.

## View it live

https://project-book-api.herokuapp.com/

Endpoints:

https://project-book-api.herokuapp.com/books - all books in the dataset

https://project-book-api.herokuapp.com/books/id - replace id with a numeric value

https://project-book-api.herokuapp.com/books/12/title - title of book with id 12

https://project-book-api.herokuapp.com/books/5/authors - list with authors of book with id 5

https://project-book-api.herokuapp.com/books?language=abc - replace abc with eng, en-US, en-GB or spa - case and character sensitive

https://project-book-api.herokuapp.com/books?title=abc - replace abc with title (not case sensitive)

https://project-book-api.herokuapp.com/books?author=abc - replace abc with author (not case sensitive)

https://project-book-api.herokuapp.com/books?toprated=20 - lists top 20 best rated books in descending order, you can replace 20 with another numeric value

https://project-book-api.herokuapp.com/books?shortest=10 - lists 10 shortest books in ascending order, you can replace 10 with another numeric value

https://project-book-api.herokuapp.com/books?author=abc&language=def - replace abc with author and def with language, see references on author and language above


