import express, { response } from "express"
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
  res.json({responseMessage: "Welcome to Jessika's book-API 📚. The following endpoints are available: /books (with the query parameters language_code and authors) and /books/:bookID"})
})

// ROUTE 2: All books with query paramenters (language code and authors)
app.get("/books", (req, res) => {
  const { authors, language_code } = req.query
  let books = booksData
  if (language_code) {
    books = books.filter(code => code.language_code.toLowerCase() === language_code.toLocaleLowerCase())
  }
  if (authors) {
    books = books.filter(name => { return name.authors.toLowerCase() === authors.toLocaleLowerCase()})
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
