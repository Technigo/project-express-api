# Project Express API

This week we dove into backend, by creating our very first API using Node.js and Express from a pre-selected dataset. The goal was to gain practical experience in setting up a server, building APIs, and manipulating data using JavaScript.

## The problem

This task was focused on installing and setting up an Express server, deploying a Node project, building an API in Node using Express, and creating routes in Express. We were also supposed to handle errors in a good way. Additionally, the task involved practicing data manipulation in JavaScript, including selecting, filtering, and limiting arrays. 

I chose a dataset containing 500 book reviews, and created 3 different endpoints by sorting, filtering and slicing the data:

- All books
- Top 100 rated books
- All non-english books

For the "/books" endpoint, I created two different queries ("language_code" and "minrating"), and then one param ("/books/:id") to select a specific book by ID. 

E.g. https://project-express-api-amd2viobia-nw.a.run.app/books?language_code=spa will give us all the books in spanish
E.g. https://project-express-api-amd2viobia-nw.a.run.app/books?minrating=4.5 will give us all the books with min average rating 4.5
E.g. https://project-express-api-amd2viobia-nw.a.run.app/books/3 will give us the book with bookId 3.

## View it live

https://project-express-api-amd2viobia-nw.a.run.app/

With a frontend:
https://mellow-florentine-088c99.netlify.app/