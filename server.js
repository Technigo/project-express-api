import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. 
// Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Endpoint to fetch all books
app.get("/books", (req, res) => {
  res.json(booksData);
});

// Function to filter books by their language
const filterBooksByLanguage = (req, res) => {
  const { language } = req.query;

  // Return an error if language query parameter is missing
  if (!language) {
    return res.status(400).json({
      error: "Language parameter is required.",
      example_usage: "Try this: /books/language?language=spa",
      query_parameter_required: "language",
      description: "Filter books by language using the language_code (e.g., 'spa', 'en', 'fr')."
    });
  }

  // Filter books matching the specified language
  const filteredBooks = booksData.filter(
    book => book.language_code.toLowerCase() === language.toLowerCase()
  );

  // Return the filtered books if matches are found, or show error
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({
      error: `No books found for this language: ${language}`,
      example_usage: "Try this: /books/language?language=spa"
    });
  }
};

// Endpoint to fetch books filtered by language
app.get("/books/language", filterBooksByLanguage);

// Endpoint to fetch details for a single book
app.get("/books/:bookID", (req, res) => {
  const bookID = req.params.bookID;

  // Find the book with the matching bookID
  const book = booksData.find(book => book.bookID === +bookID);
  // Return book details if found, or an error if no match is found
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("No book found with that ID");
  }
});

// Root endpoint to list all available API routes dynamically
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app); // Fetch all endpoints
  res.json({
    message: "Welcome to the Book API 📚 Here are the available endpoints:",
    endpoints: endpoints,
  });
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
