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

// ROUTE 1: Main page
app.get("/", (req, res) => {
  res.json({responseMessage: "Welcome to Jessika's book-API 📚. The following endpoints are available: /books; /books/:bookID"})
})

// ROUTE 2: All books
app.get("/books", (req, res) => {
  res.status(200).json({booksData: booksData})
})

// ROUTE 3: Single books displayed by ID
app.get("/books/:bookID", (req, res) => {
  const singleBook = booksData.find((book) => {
    return book.bookID ===  +req.params.bookID
  })
  console.log(singleBook)
  res.status(200).json({singleBook})
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
