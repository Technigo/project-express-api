import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";

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

app.route("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get(`/books`, (req, res) => {
  let filterBooks = [...booksData];
  const authorSearch = req.query.author;
  const languageSearch = req.query.lang;
  const ratingSearch = parseFloat(req.query.rating);

  if (authorSearch) {
    filterBooks = filterBooks.filter((item) => item.authors.toLowerCase().includes(authorSearch.toLowerCase()));
  }

  if (languageSearch) {
    filterBooks = filterBooks.filter((item) => item.language_code.toLowerCase().includes(languageSearch.toLowerCase()));
  }

  if (ratingSearch) {
    filterBooks = filterBooks.filter(
      (item) => item.average_rating >= ratingSearch && item.average_rating < ratingSearch + 1
    );
  }

  if (filterBooks.length > 0) {
    res.json(filterBooks);
  } else {
    res.status(404).send("No book was found, based on your search.");
  }
});

app.get(`/title/:title`, (req, res) => {
  const title = req.params.title.toLowerCase();
  const bookTitle = booksData.filter((item) => item.title.toLowerCase().includes(title));
  res.json(bookTitle);
});

app.get(`/isbn/:isbn`, (req, res) => {
  const isbn = req.params.isbn;
  const isbnNumber = booksData.find((item) => item.isbn === +isbn);
  if (isbnNumber) {
    res.json(isbnNumber);
  } else {
    res.status(404).send("No book was found, based on your search.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
