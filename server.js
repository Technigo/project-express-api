import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started
import booksData from "./data/books.json";

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
  res.json(endpoints);
  console.log(endpoints);
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;

  const book = booksData.find((book) => book.bookID === +bookId);

  console.log(book);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Sorry, there is no book with that Id.");
  }
});

app.get("/averageratings/:ratingNum", (req, res) => {
  const { ratingNum } = req.params;

  const rating = booksData.filter(
    (rating) => Math.round(rating.average_rating) === +ratingNum
  );
  console.log(rating);
  console.log(rating.length);

  if (rating.length > 0) {
    res.json(rating);
  } else if (rating.length === 0) {
    res.status(404).send("Sorry, there are no books with that average rating.");
  }
});

// Getting all endpoint with express List Endpoints
const endpoints = expressListEndpoints(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
