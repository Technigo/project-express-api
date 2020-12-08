import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booksData from "./data/books.json";

const port = process.env.PORT || 5000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.send("My very first backend project & book-related API!");
});

//Response to show top books - http://localhost:5000/books
app.get("/books", (request, response) => {
  let filteredBooks = booksData.slice(0,50);
  const { author, title } = request.query;
  const average_rating = request.query.average_rating;
  const num_pages = request.query.num_pages;

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

  //Show books by author http://localhost:5000/books?author=author
  //Show books by title http://localhost:5000/books?title=title
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

//Show books by bookID - http://localhost:5000/books/5
//Some IDs are not included in the array, such as for example 19 and 20.
app.get("/books/:bookID", (request, response) => {
  const bookID = request.params.bookID;
  const showBookID = booksData.find((book) => book.bookID === +bookID);

  if (!showBookID) {
    response.send(
      "Hmm, we can't find that book in our database. Try searching another ID!"
    );
  }

  response.json(showBookID);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
