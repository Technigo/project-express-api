import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booksData from "./data/books.json";

const port = process.env.PORT || 5000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const myEndpoints = require('express-list-endpoints')
// Start defining your routes here
app.get("/", (request, response) => {
  response.send(myEndpoints(app));
});

//Response to show top 50 books - http://localhost:5000/books
app.get("/books", (request, response) => {
  let filteredBooks = booksData.slice(0,50);
  const { author, title, average_rating, num_pages } = request.query;

  //Show bookss by rating - http://localhost:5000/books?average_rating=high
  //Show bookss by number of pages - http://localhost:5000/books?num_pages=lots
  if (average_rating === "high") {
    filteredBooks = filteredBooks.sort(
      (x, y) => y.average_rating - x.average_rating
    );
  } else if (average_rating === "low") {
    filteredBooks = filteredBooks.sort(
      (x, y) => x.average_rating - y.average_rating
    );
  } else if (num_pages === "lots") {
    filteredBooks = filteredBooks.sort((x, y) => y.num_pages - x.num_pages);
  } else if (num_pages === "few") {
    filteredBooks = filteredBooks.sort((x, y) => x.num_pages - y.num_pages);
  }

  //Filter books by author http://localhost:5000/books?author=author
  //Filter books by title http://localhost:5000/books?title=title
  if (title) {
    filteredBooks = filteredBooks.filter((item) =>
      item.title.toString().toLowerCase().includes(title.toLowerCase())
    );
  } else if (author) {
    filteredBooks = filteredBooks.filter((item) =>
      item.authors.toString().toLowerCase().includes(author.toLowerCase())
    );
  } 

  response.json(filteredBooks);
});

//Show books by bookID - http://localhost:5000/books/id/5
//Some IDs are not included in the array, such as for example 19 and 20, that's when the error response will print.
app.get("/books/id/:bookID", (request, response) => {
  const bookID = request.params.bookID;
  const queriedBook = booksData.find((book) => book.bookID === +bookID);

  if (!queriedBook) {
    response.send(
      "Hmm, we can't find that book in our database. Try searching another ID!"
    );
  }

  response.json(queriedBook);
});

//Show authors by bookAuthor - http://localhost:5000/books/author/name
app.get("/books/author/:author", (request,response) => {
  const bookAuthor = request.params.authors;
  const chosenAuthor = booksData.filter((book) => book.authors.includes(bookAuthor))

  if(!chosenAuthor) {
    response.send(
      "No such author. Search someone else perhaps?"
    );
  }

  response.json(chosenAuthor)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
