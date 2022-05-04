import express from "express";
import cors from "cors";

import booksData from "./data/books.json";



const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/books", (req, res) => {
  res.json(booksData)
})

app.get("/books/top-rated", (req, res) => {
  const highAvgRating =  booksData.filter((book) => book.average_rating >= 4)
  res.json(highAvgRating)
})

app.get("/books/title/:title", (req, res) => {
  const title = req.params.title
  let titleInput = booksData.filter((str) => str.title.toLowerCase() === title.toLowerCase())

  if(titleInput) {
    res.status(200).json({
      data: titleInput,
      success: true})
  } else {
    res.status(400).json({
      data: "Not found",
      success: false})
  }
})

app.get("/books/authors/:authors", (req, res) => {
  const authors = req.params.authors
  let authorsInput = booksData.filter((str)=> str.authors.toLowerCase() === authors.toLowerCase())
  if(authorsInput) {
    res.status(200).json({
      data: authorsInput,
      success: true})
  } else {
    res.status(400).json({
      data: "Not found",
      success: false})
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
