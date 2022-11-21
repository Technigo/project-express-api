import express, { request } from "express";
import cors from "cors";
import booksData from "./data/books.json"

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({responseMessage: "Welcome to my API! Navigate to /books to view the entire array, or enter any of the following queries to find a specific book: bookID, title, authors, average_rating, isbn, isbn13, language_code, num_pages, ratings_count, text_reviews_count"});
});

// This get request below includes query parameters, allowing you to filter by the role or name in the array.
app.get("/books", (req, res) => {
  const { title, authors } = req.query;
  let books = booksData;
  if (title) {
    books = books.filter(singleBook => singleBook.title.toLowerCase() === role.toLowerCase());
  }
  if (authors) {
    books = books.filter(singleBook => singleBook.name.toLowerCase() === role.toLowerCase());
  }


  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: books
    }
    
  });
});

app.get("/books/id/:bookID", (req, res) => {
  const singleBook = booksData.find((book) => {
    return book.bookID === Number(+req.params.bookID);
  });
  res.status(200).json({singleBook});
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
