import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;

// Use express-list-endpoints to get all the data of the routes
const listEndPoints = require("express-list-endpoints")
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Display list of all the routes on the main page
app.get("/", (req, res) => {
  res.send(listEndPoints(app));
});

// Define the routes
app.get("/", (req, res) => {
  res.send("Data of the page")
})

// List all the books in the booksData array
app.get("/books", (req, res) => {
  res.json(booksData)
})

// Find a book by ID
app.get("/books/:id", (req, res) => {
  const id = req.params.id
  const findBookByID = booksData.find((book) => book.bookID === +id)
  res.json(findBookByID)
})

// List all the books in the array that have more than 500 pages
app.get("/longBooks", (req, res) => {
  let booksOver500Pages = booksData.filter((book) => book.num_pages > 500)
  res.json(booksOver500Pages)
})


// Find books by a specific author
app.get("/:author", (req, res) => {
  const author = req.params.author
  const booksFromAuthor = booksData.filter((book) => book.authors === author)
  res.json(booksFromAuthor)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
