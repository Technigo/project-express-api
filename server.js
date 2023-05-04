import express from "express";
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

// Start defining your routes here
app.get("/books", (req, res) => {
  res.send(booksData);
})
// added error-handlers for eventual Bad Request and 404-page
// because the isbn is a number and the parameter is a string - I needed to add the toString-function after the books isbn-number 
// One endpoint to return a single result (one book), based on the isbn-number requested in the url
app.get("/books/:isbn", (req, res) => {
  if (typeof req.params.isbn !== "number") {
    res.status(400).send("ISBN must be a valid number");
  }
  let hits = booksData.filter(book => book.isbn.toString() === req.params.isbn)
  if (hits.length === 0) {res.status(404).send("Sorry, no book with that ISBN-nr exists =(")}
  res.send(hits)
})
// One endpoint to return a single result (one book), based on the isbn13-number requested in the url
app.get("/books/isbn13/:isbn", (req, res) => {
  if (typeof req.params.isbn !== "number") {
    res.status(400).send("ISBN must be a valid number");
  }
  let hits = booksData.filter(book => book.isbn13.toString() === req.params.isbn)
  if (hits.length === 0) {res.status(404).send("Sorry, no book with that ISBN-nr exists =(")}
  res.send(hits)
})

app.post("/books", (req, res) => {
  res.status(201).send();
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
