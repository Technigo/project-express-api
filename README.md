# Express API Project

In this project I have created an API based on data about Books. 
Express server is a webframwork for Node.js. short FAQ about the server is found here: https://expressjs.com/en/starter/faq.html. 

## The problem

The idea was to create an API with endpoints in from a datafile of books. I started with an endpoint that responded with all the books and after that one book by calling the book's id.
I implemented the methods .filter, .find and .slice. and to some extent I also implemented some status codes when there is no result.
I found it challenging to understand concept of the params, and the needed switches integers <-> strings and to get the queries right.

## View it live
https://ninamansster-book-api.herokuapp.com/

## Endpoints to use for calling the API
Try searches based on the url above + the following routes
### all the books
/books 
### top 50 books based on average rating
/books/sort/rating
### 10 books per page
/booklists?page=[a number] 
### Endpoint for the id-search
books/id/[a number] 
### find all the books an author has written
/author/[name of author] 
### find a specific title
/titles/[name of title]
### Search for title or author
query for any word in title or author: /library?search=[type your search]
