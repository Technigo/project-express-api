# Express API Project 🗂

The focus for this weeks project is to start learning backend by creating our very first API using Express. 

## The task/How I solved it 💡
The task was to create an API that would have a couple of RESTful endpoints, which return either an array of data or a single item. Since we're not using databases yet we got a set of hard-coded data stored as a JSON files to use in this project.

I love books! 📚 So I decided to use the file with a list of books and book reviews. The API endpoints I've created use the data from this file, along with array methods such as .find(), .filter(), and .slice() to select, filter, or limit the items returned in the responses.

I started out with listing all the books in the data with the route /books. 
I've also created the following routes/endpoints and queries:
- /books/:id that takes id as a path parameter, finding one single book based on its id
- query /authors to filter books by authors
- query /titles to filter books by title
- query /toplist for finding a toplist of books (by sorting the books on rating and query parameter for showing a choosen number of books)
- query /result-page for pagination - showing 50 books on each page
- empty/dummy-endpoint that could be used in the future: sorting books by category
- I've also created a couple of error messages that will be shown if the response status is 404.

## Tech 👩‍💻
- JavaScript
- Express
- Node.js
- API

## View it live 📚
Link to deployed project on Heroku: https://emmas-book-api.herokuapp.com/
