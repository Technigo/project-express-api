import express, { request, response } from "express";
// import bodyParser from 'body-parser'
// import cors from 'cors'

import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:

//   PORT=9000 npm start
// const port = process.env.PORT || 8080
const port = 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// app.use(cors())
// app.use(bodyParser.json())
//

// endpoint to get books by author
app.get("/books", (req, res) => {
  const { author } = req.query;
  if (author) {
    const filteredBooks = booksData.filter(
      (book) => book.authors.includes(author),
      res.jsonfilteredBooks
    );
  } else {
    res.json(booksData);
  }
});

// endpoint to get one book (to get specific items)
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = booksData.find((book) => book.bookID === +id);
  if (!book) {
    res.status(404).send(`No book with id ${id} was found`);
  } else {
    res.json(book);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server is running on http://localhost:${port}`);
});
