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
    message: "ENDPOINTS: /books, /books/1, /books/language/eng",
  });
});

// This endpont will return the full list of books
app.get("/books", (req, res) => {
  res.json(booksData);
});

// This endpont will return a single book with the ID specified by the frontend
app.get("/books/id/:id", (req, res) => {
  const id = req.params.id;

  const bookID = booksData.find((book) => book.bookID === +id); //The + is used to turn a string into a number

  if (bookID) {
    res.json(bookID);
  } else {
    res.status(404).json({ message: "No book with that ID was found." });
  }
});

// This endpoint will return a list of books with the specified language
app.get("/books/language/:language", (req, res) => {
  const language = req.params.language;
  const booksLanguageCode = booksData.filter(
    (item) => item.language_code === language
  );
  if (booksLanguageCode) {
    res.json(booksLanguageCode);
  } else {
    res.json({ message: "Wrong language" });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
