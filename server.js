import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);

  res.json(endpoints);
});

// Filter books
const filterBooks = (booksData, query) => {
  let filteredBooks = [...booksData];

  // Filter by title
  if (query.title) {
    const titleRegex = new RegExp(query.title, "i");
    filteredBooks = filteredBooks.filter((book) => titleRegex.test(book.title));
  }

  // Filter by author
  if (query.authors) {
    const authorsRegex = new RegExp(query.authors, "i");
    filteredBooks = filteredBooks.filter((book) =>
      authorsRegex.test(book.authors)
    );
  }

  // Filter by minimum rating
  if (query.minRating) {
    const minRating = parseFloat(query.minRating);
    filteredBooks = filteredBooks.filter(
      (book) => book.average_rating >= minRating
    );
  }
  // Response if no books are found
  if (filteredBooks.length === 0) {
    return "Not found";
  }

  return filteredBooks;
};
// Get list of books
app.get("/books", (req, res) => {
  const filteredBooks = filterBooks(booksData, req.query);
  res.json(filteredBooks);
});

// Get info about a particular book
app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const book = booksData.find((book) => +bookId === book.bookID);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Could not find book");
  }
});

// Empty/dummy endpoints
app.post("/books", (req, res) => {
  // Placeholder
});

app.put("/books:bookId", (req, res) => {
  // Placeholder
});

app.delete("/books:bookId", (req, res) => {
  // Placeholder
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
