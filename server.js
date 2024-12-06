import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Books route
app.get("/books", (req, res) => {
  res.json(booksData)
})

// Function to filter books by language
const filterBooksByLanguage = (req, res) => {
  const { language } = req.query

  // If no language is specified, return error
  if (!language) {
    return res.status(400).send("Language parameter is required")
  }

  // Filter books by language code (case-insensitive)
  const filteredBooks = booksData.filter(
    book => book.language_code.toLowerCase() === language.toLowerCase()
  )

  // Check if any books match the language
  if (filteredBooks.length > 0) {
    res.json(filteredBooks)
  } else {
    res.status(404).send(`No books found for language: ${language}`)
  }
}

// Route using the language filter function
app.get("/books/language", filterBooksByLanguage)

// Singular book route
app.get("/books/:bookID", (req, res) => {
  const bookID = req.params.bookID

  const book = booksData.find(book => book.bookID === +bookID)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send("No book found with that ID")
  }
})

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app); // Get all endpoints
  res.json({
    message: "Welcome to the Book API 📚 Here are the available endpoints:",
    endpoints: endpoints,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
