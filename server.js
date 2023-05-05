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
app.use(express.urlencoded({extended:false}));

// Start defining your routes here
app.get("/books", (req, res) => {
  res.send(booksData);
})
// added error-handlers for 404-responses
// because the isbn is a number and the parameter is a string - I needed to add the toString-function after the books isbn-number 
// One endpoint to return a single result (one book), based on the isbn-number requested in the url
app.get("/books/isbn/:isbn", (req, res) => {
  let hits = booksData.filter(book => book.isbn.toString() === req.params.isbn)
  if (hits.length === 0) {res.status(404).send("Sorry, no book with that ISBN-nr exists =(")}
  res.send(hits[0])
})
// query parameter - filters on author or title using query parameters
app.get("/books/authors", (req, res) => {
  let author = req.query.author
  let title = req.query.title
  let hits = booksData
  if (author !== undefined) {hits = hits.filter(book => book.authors === author)}
  if (title !== undefined) {hits = hits.filter(book => book.title === title)}
  console.log(hits)
  if (hits.length === 0) {res.status(404).send("Sorry, we couldn't find the book you're looking for =(")}
  res.send(hits)
  })
// One endpoint to return a single result (one book), based on the isbn13-number requested in the url
app.get("/books/isbn13/:isbn", (req, res) => {
  let hits = booksData.filter(book => book.isbn13.toString() === req.params.isbn)
  if (hits.length === 0) {res.status(404).send("Sorry, no book with that ISBN-nr exists =(")}
  res.send(hits[0])
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
