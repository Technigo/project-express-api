import express from "express";
import cors from "cors";
import listEndpoints from 'express-list-endpoints'

import booksData from "./data/books.json";


const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

// Startscreen
app.get("/", (req, res) => {
  res.send("Hello and welcome to your friendly book search! Add /endpoints in url to see what you which routes you can use.");
});

// To see what endpoints exists
app.get('/endpoints', (req, res) => {
  res.json(listEndpoints(app))
})

// All books
app.get("/books", (req, res) => {
  res.status(200).json(booksData)
  // res.status(200).json({books: booksData})
});

// Filter on bookID
app.get("/books/:id", (req, res) => {
  const id = req.params.id
  const bookId = booksData.filter((book) => book.bookID === +id)

  if (bookId && bookId?.length > 0) {
    res.status(200).json(bookId)
    } else {
    res.status(404).send({
      message: "bookId not found, try another number",
      error: 404})
  }
});

// Lists all authors with books
app.get("/authors", (req, res) => {


 let authorList = booksData.map((i) =>  {
    return {
      "author": i.authors,
      "books": i.title,
      "id": i.bookID
  }}) 
   
  res.status(200).json({authors: authorList})
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
