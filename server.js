const express = require("express");
const listEndPoints = require("express-list-endpoints");
import cors from "cors";
import topBooks from "./data/100-trending-books.json";

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json()) Damen hade detta i sitt exempel??

// Endpoint to return documentation using Express List Endpoints
app.get("/", (req, res) => {
  const documentation = {
    endpoints: listEndPoints(app), 
    additionalInfo: {
      '/books': {
        description: "Get a list of books with optional filtering", 
        queryParams: {
          rating: "Filter books based on requested mininum rating"
        }, 
        example: "https://books-toplist-100.onrender.com/books/?rating=4.7"
      }, 
      '/genre': {
        description: "Get a list of books with optional filtering based on genre", 
        queryParams: {
          rating: "Filter books based on requested genre and mininum rating"
        }, 
        example: "https://books-toplist-100.onrender.com/genre/fantasy/?rating=4.9"
      }
    }
  }
  res.json(documentation)
});

//Endpoint to return a collection of results (array of elements) (books)
app.get("/books", (req, res) => {
  const requestedRating = req.query.rating
  let filteredBooks = topBooks

  //Adding a filter function so user can filter out books based on a minimum rating
  if (requestedRating) {
    //Filter by rating if the rating query parameter is present
    const minRating = parseFloat(requestedRating);
    filteredBooks = topBooks.filter((item) => item.rating >= minRating)
  }
  res.json(filteredBooks);
});

// Endpoint to return a single result (book with certain ranking)
app.get("/rank/:rank", (req, res) => {
  const rank = req.params.rank;

  if (isNaN(rank)) {
    res.status(400).json({ error: "Invalid rank parameter" });
    return;
  }

  // Fetch the book with the matching ID from the database or array
  const book = topBooks.find((book) => book.Rank === parseInt(rank));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found", rank: parseInt(rank) });
  }
});

// Endpoint to filter books by the provided author name
app.get("/author/:authorName", (req, res) => {
  const authorName = req.params.authorName;
  const booksByAuthor = topBooks.filter(
    (b) => b.author.toLowerCase() === authorName.toLowerCase()
  );

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res
      .status(404)
      .json({ error: `Books by "${authorName}" not found`, authorName });
  }
});

// Endpoint to filter books by genre, optionally by rating
app.get("/genre/:genre", (req, res) => {
  const requestedGenre = req.params.genre.toLowerCase()
  const requestedRating = req.query.rating

  let booksInGenre = topBooks.filter((item) =>
    item.genre.toLowerCase().split(", ").includes(requestedGenre)
  );

  if (requestedRating) {
    //Filter by rating if the rating query parameter is present
    const minRating = parseFloat(requestedRating);
    booksInGenre = booksInGenre.filter((item) => item.rating >= minRating)
  }

  if (booksInGenre.length > 0) {
    res.json(booksInGenre);
  } else {
    res
      .status(404)
      .json({
        error: `Books in the specified genre "${requestedGenre}" not found`,
      });
  }
});

//----- Dummy endpoints ------------

// Dummy endpoint for creating a new book
app.post("/books", (req, res) => {
  // Placeholder for creating a new book
  res
    .status(501)
    .json({ error: "Not Implemented - Placeholder for creating a new book" });
});

// Dummy endpoint for deleting an existing book
app.delete("/books/:rank", (req, res) => {
  // Placeholder for deleting an existing book
  const rank = req.params.rank;
  res
    .status(501)
    .json({
      error: `Not Implemented - Placeholder for deleting book with rank ${rank}`,
    });
});

//----------------------------------

//Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Data collected from Kaggle: 
//https://www.kaggle.com/datasets/anshtanwar/top-200-trending-books-with-reviews