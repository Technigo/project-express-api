# Express API Project

This weeks project was to create an API using Express. The learning objective was to learn to build an API in Node, create routes in Express and practice manipulation of data in JavaScript.

## The problem

I decided to use the books.json as my data in this project. The data is stored in a JSON file in the data folder, instead of using a database. The data contains 500 books and information about reviews, pages, language etc. I decided to make one endpoint which retrieves all data (/books) and one that will retrive a certain book based on the ID it has using params (/book/:id). For the id endpoint I added an error message if there is no book with the choosen id. 

I continued by maken a number of queries where the user can query for a specific author, ratings and language. I also added a query where the user can display a toplist and query for how many books to display in the list. 

If I had more time I would have tried pagination, added some more error messages, created some documentation for the API and to create a frontend to present/use the data.

## View it live

https://annas-books-api.herokuapp.com/

