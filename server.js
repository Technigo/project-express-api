import express from "express";
import cors from "cors";
import listEndpoints from 'express-list-endpoints'

import booksData from "./data/books.json";



const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/books", (req, res) => {
  res.json(booksData)
})

app.get("/books/top-rated", (req, res) => {
  const highAvgRating =  booksData.filter((book) => book.average_rating >= 4)
  res.status(200).json(highAvgRating)
})

app.get("/books/title/:title", (req, res) => {
  const title = req.params.title
  let titleInput = booksData.find((str) => str.title.toLowerCase() === title.toLowerCase())

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

app.get("/books/author/:authors", (req, res) => {
  const authors = req.params.authors
  let authorsInput = booksData.filter((str)=> str.authors.toLowerCase() === authors.toLowerCase())
  if(authorsInput) {
    res.status(200).json({
      data: authorsInput,
      success: true})
  } else {
    res.status(200).json({
      data: "Not found",
      success: false})
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
