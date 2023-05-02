import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// home screen
app.get("/", (req, res) => {
  res.send("Check out our books!");
});

// get all book titles
app.get("/book-titles", (req, res) => {
  const bookTitles = booksData.map(book => book.title); 
  if (bookTitles) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        bookTitles: bookTitles
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
  });
}
});

// get all authors

app.get("/book-authors", (req, res) => {
  const bookAuthors = booksData.map(authors => book.authors); 
  if (bookAuthors) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        bookAuthors: bookAuthors
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
  });
}
});

// filter books by ratings

app.get("/book-ratings", (req, res) => {
  const bookRatings = bookRatingsAboveFour.find((bookRatings) => {
    const { bookID } = request.params;
    console.log("bookID")
    return book.bookID == request.params.id
  }
  ); 
  if (bookRatings) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        bookRatings: bookRatings
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Ratings went wrong",
      body: {}
  });
}
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
