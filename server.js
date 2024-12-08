import express from "express";
import cors from "cors";

import booksData from "./data/books.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;

const listEndPoints = require('express-list-endpoints')
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


//Documentation about the API
app.get("/", (request, response) => {
  response.send(listEndPoints(app))
});

//Sends the collection of books as a json-file. Also accepts a query-request of length to filter out the books of a certain length
app.get("/books", (request, response) => {
  const lengthOfBook = request.query.length

  if (lengthOfBook) {
    const shorterBooksArray = booksData.filter(item => item.num_pages < parseFloat(lengthOfBook))
    response.json(shorterBooksArray)
  } else response.json(booksData)
})

//Finding a certain book by the book-id
app.get("/books/:bookID", (request, response) => {
  const theBookID = parseInt(request.params.bookID)
  const theBook = booksData.find(item => item.bookID === theBookID)

  if (theBook) response.json(theBook)
  else response.status(404).send("The book is not found in the database")
})

//Finding all books with a rating of for example 4
app.get("/ratings/:number", (request, response) => {
  const ratingNumber = parseInt(request.params.number)
  const booksRated = booksData.filter(item => item.average_rating >= ratingNumber && item.average_rating < (ratingNumber + 1))

  if (booksRated.length > 0) response.json(booksRated)
  else response.status(404).send(`Something is not working, there might not be any books rated ${ratingNumber}`)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
