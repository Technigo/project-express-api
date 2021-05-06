import express, { request, response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from "./data/books.json";
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({
    message:
      "ENDPOINTS: /books, /books/id/1, /books/language/eng, books?author=harry, books?title=harry",
  });
});

// This endpont will return a single book with the ID specified by the frontend
app.get("/books/id/:id", (req, res) => {
  const id = req.params.id;

  const bookID = booksData.find((book) => book.bookID === +id); //The + is used to turn a string into a number

  if (bookID.length) {
    res.json(bookID);
  } else {
    res.status(404).json({ message: "No book with that ID was found." });
  }
});

// This endpoint will return a list of books with the specified language
app.get("/books/language/:language", (req, res) => {
  const language = req.params.language;

  const booksLanguageCode = booksData.filter(
    (book) => book.language_code === language
  );

  if (!booksLanguageCode.length) {
    res.status(404).json({ message: "Incorrect language" });
  } else {
    res.json(booksLanguageCode);
  }
});

// This endpong will return the full list of books if no query parameters are sent.
app.get("/books", (req, res) => {
  const { author, title } = req.query; // Setting Author as a query param.

  let books = booksData; // Making an instance of booksData

  // This is checking if author === true, if it is, then add the filtered book to the books variable.
  if (author) {
    books = booksData.filter((book) =>
      book.authors.toLowerCase().includes(author.toLowerCase())
    );
  }

  // This is checking if title === true, if it is, then add the filtered book to the books variable.
  if (title) {
    books = booksData.filter((book) =>
      book.title.toString().toLowerCase().includes(title.toLowerCase())
    );
  }

  // This will check if the books variable has any length at all. IF there is then print the result
  // If no, then print a status message
  if (books.length) {
    res.json(books);
  } else {
    res.status(404).json({ error: "No books found" });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
