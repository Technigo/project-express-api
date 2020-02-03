# Express API Project

In this project I have created an API based on data about Books. 
Express server is a webframwork for Node.js. short FAQ about the server is found here: https://expressjs.com/en/starter/faq.html. 

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

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
