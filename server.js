import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booksData from "./data/books.json";

const ERROR_NOT_FOUND = { error: "No book results were found" };

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing - makes it easier for frontend to use the API. Corrs allows API's to say where requests can come from. To add extra security
app.use(cors());
app.use(bodyParser.json()); //This allows Express to read JSON in POST requests

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/books", (req, res) => {
  let page = req.query.page ?? 1;
  const pageSize = req.query.pageSize ?? 20; // this allows http://localhost:8080/books?page=1&pageSize=10
  page = +page - 1;
  let bookList = booksData;
  console.log(`page = ${page}`);
  const startIndex = page * pageSize; //calculate the start index
  const endIndex = startIndex + +pageSize;
  const booksForPage = bookList.slice(startIndex, endIndex); //Slice creates a new array to limit the number of books returned to 20 per page

  if (bookList.length === 0) {
    res.status(404).send(ERROR_NOT_FOUND);
  }
  const returnObject = {
    pageSize: booksForPage.length,
    currentPage: page + 1,
    maxPages: Math.ceil(bookList.length / pageSize),
    totalNumOfBooks: bookList.length,
    results: booksForPage,
  };
  res.send(returnObject);
});

app.get("/books/bookauthor", (req, res) => {
  const { author } = req.query;
  let bookListAuthor = booksData;

  if (author) {
    bookListAuthor = bookListAuthor.filter(book =>
      book.authors.toString().toLowerCase().includes(author.toLowerCase())
    );
    if (bookListAuthor.length === 0) {
      res.status(404).send(ERROR_NOT_FOUND);
    }
    res.json(bookListAuthor);
  }
});

app.get("/books/booktitle", (req, res) => {
  const { title } = req.query;
  let bookListTitle = booksData;

  if (title) {
    bookListTitle = bookListTitle.filter(book =>
      book.title.toString().toLowerCase().includes(title.toLocaleLowerCase())
    );
    if (bookListTitle.length === 0) {
      res.status(404).send(ERROR_NOT_FOUND);
    }
    res.json(bookListTitle);
  }
});

app.get("/books/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const book = booksData.find(book => book.bookID === +id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ Error: `Book id ${id} not found` });
  }
});

//Dummy endpoint
app.get("/isbn/:isbn", (req, res) => {
  // TODO: This will return specific book by ISBN number
});

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
