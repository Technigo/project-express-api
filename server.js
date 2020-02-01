import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksData from "./data/books.json";

//     Example of json stucture
//
//     "bookID": 2,
//     "title": "Harry Potter and the Order of the Phoenix (Harry Potter  #5)",
//     "authors": "J.K. Rowling-Mary GrandPré",
//     "average_rating": 4.49,
//     "isbn": 439358078,
//     "isbn13": 9780439358071,
//     "language_code": "eng",
//     "num_pages": 870,
//     "ratings_count": 1996446,
//     "text_reviews_count": 27613

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = booksData.find(item => item.bookID.toString() === bookId);
  res.json(book);
});

app.get("/language/:language", (req, res) => {
  const language = req.params.language;
  const booksInLanguage = booksData.filter(item => item.language_code === language);
  res.json(booksInLanguage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
