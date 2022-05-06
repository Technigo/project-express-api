import express from "express";
import cors from "cors";

import books from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())


// ROUTES

// defining my routes, starts here
app.get("/", (req, res) => {

  const LandingPage = {
    Welcome:
    "This is an open API with 500 book reviews.",
    Routes: [
      {
          "/books/:title": "Get the title of the book",
          "/books/top-rated": "Get how the books are rated, from highest to lowest rated books",
          "/books/book/:bookID": "Shows a specifik bookID",
      }
    ]
  }

  res.send(LandingPage)
})

// books to get all the books
app.get('/books', (req, res) => {
res.status(200).json(books)
})

// title to get the title
app.get('/books/:title', (req, res) => {
    const booksTitle = books.find(
      (books) => books.title === req.params.title)

    res.status(200).json(booksTitle)
})

// /books/top-rated
// res: shows top rated to lowest rated
// using slice() to show top 10 out of all rated books
app.get('/books/top-rated', (req, res) => {
  const bookRating = books.sort(
    (a, b) => b.average_rating - a.average_rating
  )
  res.json(bookRating.slice(0, 50))
})

// /books/book/1
// :bookID = param to trigger a param example console(req params)
// will look for a specific param, in this case a specific ID from books
app.get('/books/book/:bookID', (req, res) => {
const { bookID } = req.params
const { book } = books.find((item) => item.bookID === +bookID)

if (!book) {
  res.status(404).send(`Error, there is no book with book-ID ${bookID}`)
} 
res.json(book)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
