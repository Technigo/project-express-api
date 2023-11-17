import express from "express";
import cors from "cors";
import booksData from "./data/books.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const listEndpoints = require("express-list-endpoints")

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
 
const documentation = {
    endpoints: listEndpoints(app),
  };

  res.json(documentation);
});


app.get("/books", (req, res) => {
  res.json(booksData)
});

app.get ("/books/:id", (req,res) => {
  const id = req.params.id
  const bookId = booksData.find((book) => book.bookID === +id)

    if (bookId) {
    res.json(bookId)
  } else {
    res.status(404).send('Sorry, there is no book with this ID. Try another ID.')
  }
});


app.get("/author/:author", (req, res) => {
  let author = req.params.author
  let bookAuthor = booksData.find((book) => book.authors === author) 

  res.json(bookAuthor)
});


app.get ("/languange/:languange", (req, res) => {
  const languange = req.params.languange
  const bookLanguange = booksData.filter((book) => 
    book.language_code === languange)
  
  res.json(bookLanguange)
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
