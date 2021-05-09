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

// endpoint to get all books
app.get("/books", (req, res) => {
  res.json(booksData);
});

// endpoint to get one book
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = booksData.find(book => book.bookID === +id);
  res.json(book);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server is running on http://localhost:${port}`);
});
