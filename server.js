import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booksData from "./data/books.json";

const ERROR_PAGES_NOT_FOUND = { error: "No book have that number of pages" };
const ERROR_NOT_FOUND = {
  error:
    "The result you're looking for is nowhere to find. Please try something else!",
};
const port = process.env.PORT || 8081;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Starting route
app.get("/", (req, res) => {
  res.send("API of Books");
});

// Endpoint that shows all of the books in the API.
app.get("/books", (req, res) => {
  res.json(booksData);
});

// Endpoint that shows all the authors, sorted in alphabetic order
app.get("/books/authors/", (req, res) => {
  const allAuthors = booksData.map((item) => item.authors).sort();
  res.json(allAuthors);
});

// Endpoint that shows one book from a specifik id
app.get("/books/id/:id", (req, res) => {
  const id = req.params.id;
  const filteredById = booksData.find((item) => item.bookID === +id);

  if (filteredById.length === 0) {
    res.status(404).json(ERROR_NOT_FOUND);
  } else {
    res.json(filteredById);
  }
});

// Endpoint that shows the books that have a specific number of pages
app.get("/books/pages/:pages", (req, res) => {
  const pages = req.params.pages;
  const filteredByPages = booksData.filter((item) => item.num_pages === +pages);

  if (filteredByPages.length === 0) {
    res.status(404).json(ERROR_PAGES_NOT_FOUND);
  } else {
    res.json(filteredByPages);
  }
});

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
