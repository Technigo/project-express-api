import express, { response } from "express";
import cors from "cors";
import booksData from "./data/books.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();


// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Route One - main "page"
app.get("/", (req, res) => {
  res.send("Hello, let's check out the world of BOOKS!")
});

// Route Two - All books with query params (title and average_rating)
app.get("/books", (req, res) => {
  const { authors, average_rating } = req.query
  let books = booksData
  if (average_rating) {
    books = booksData.filter(rating => rating.average_rating.toLowerCase() === average_rating.toLowerCase());
  }
  if (authors) {
    books = booksData.filter(name => { return name.authors.toLowerCase() === authors.toLowerCase()});
  }

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: books
    }
  });
}); 

app.get("/books/:id", (req, res) => {
  const singleBook = booksData.find((book) => {
    return book.bookID ===  +req.params.id
  });
  if (singleBook) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        books: singleBook
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
console.log(singleBook)
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
