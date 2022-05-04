import express from "express";
import cors from "cors";

import books from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// defining my routes here, starts here
app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})

// books to get all the books
app.get('/books', (req, res) => {
res.status(200).json(books)
})

// title to get all titles
app.get('/books/:title', (req, res) => {
    const booksTitle = books.find(
      (books) => books.title === req.params.title)

    res.status(200).json(booksTitle)
})

// to get all id:s

app.get('/books/title/:id', (req, res) => {
const bookID = books.find(
  (books) => books.id === req.params.bookID)

res.status(200).json(bookID)
})

// app.get('/authors', (req, res) => {


// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
