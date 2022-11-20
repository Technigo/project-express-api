import express from "express"
import cors from "cors"
import booksData from "./data/books.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json())

// ROUTE 1: Main "page"
app.get("/", (req, res) => {
  res.json({
    responseMessage: "Welcome to Jessika's book-API 📚",
    routes: 
      {
        "/books": "lists all the books",
        "/books?author=*NAME OF AUTHOR*": "search for a specific author",
        "/books?title=*TITLE OF BOOK*": "search for a specific title", 
        "/books?highRating=true": "search for a book with a rating over 4",
        "/books?lowRating=true": "search for a book with a rating below 4",
        "/books/*ID OF BOOK*": "search for a book by its unique id"
    }
    })
})

// ROUTE 2: All books with query paramenters (author, title, high rating and low rating)
app.get("/books", (req, res) => {
  const { author, title, highRating, lowRating } = req.query
  let books = booksData

  // Find a specific author: books?author=NAME OF AUTHOR (since I have used .includes, the name does not have to be written out in full)
  if (author) {
    books = books.filter((singleAuthor) =>
    singleAuthor.authors.toLowerCase()
    .includes(author.toLowerCase()))
  }

  // Find a specific title: books?title=TITLE OF BOOK (same as above regarding .includes)
  if (title) {
    books = books.filter((name) => name.title.toLowerCase()
    .includes(title.toLowerCase()))
  }

  // Find books with a rating over 4: books?highRating=true
  if (highRating) {
    books = books.filter((rating) => rating.average_rating > '4')
  }

  // Find books with a rating below 4: books?lowRating=true
  if (lowRating) {
    books = books.filter((rating) => rating.average_rating < '4')
  }

  res.status(200).json({
    success: true, 
    message: "OK",
    body: {
      booksData: books
    }
    })
})

// ROUTE 3: Single books displayed by ID
app.get("/books/:bookID", (req, res) => {
  const singleBook = booksData.find((book) => {
    return book.bookID ===  +req.params.bookID
  })
  if (singleBook) {
    res.status(200).json({
      success: true, 
      message: "OK",
      body: {
        books: singleBook
      }
  })
} else {
  res.status(404).json({
    sucess: false,
    message: "Not found",
    body: {}
  })
}
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})