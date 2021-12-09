import express from "express";
import cors from "cors";

import data from "./data/golden-globes.json";
import books from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello there! chose by books or golden globe nominees ");
});
//Golden Globe routes
app.get("/nominations", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  if (page || limit) {
    results.results = data.slice(startIndex, endIndex);
    res.json(results);
  } else if (data) {
    res.json({
      response: data.slice(5, 10),
      success: true,
    });
  } else {
    res.status(404).json("Sorry! this page does not exist");
  }
});

app.get("/nominations/year/:year", (req, res) => {
  const year = req.params.year;
  const { won, nominee } = req.query;
  let nominationsFromYear = data.filter((item) => item.year_award === +year);
  if (won) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }
  if (nominee) {
    nominationsFromYear = nominationsFromYear.filter(
      (item) => item.nominee.toLowerCase().indexOf(nominee.toLowerCase()) !== -1
    );
  }
  if (!nominationsFromYear) {
    res.status(404).json("Sorry! there was no nominations from this year");
  } else {
    res.json({
      response: nominationsFromYear,
      success: true,
    });
  }
});
app.get("/nominations/films", (req, res) => {
  const { film, nominee } = req.query;
  const films = data.filter((item) => item.film);
  let filmsToSend = films;

  if (film) {
    filmsToSend = filmsToSend.filter(
      (item) => item.film.toLowerCase().indexOf(film.toLowerCase()) !== -1
    );
  }
  if (nominee) {
    filmsToSend = filmsToSend.filter(
      (item) => item.nominee.toLowerCase().indexOf(nominee.toLowerCase()) !== -1
    );
  }
  if (!filmsToSend) {
    res.status(404).json("Sorry! this page does not exist");
  } else {
    res.json({
      response: filmsToSend,
      success: true,
    });
  }
});

// Books route by id
app.get("/books/id/:id", (req, res) => {
  const { id } = req.params;
  const bookById = books.filter((book) => book.bookID === +id);

  if (!bookById) {
    res.status(404).json("No book found with this ID");
  } else {
    res.json(bookById);
  }
});
//books by author
app.get("/books", (req, res) => {
  const { authors, title } = req.query;
  let booksToSend = books;

  if (authors) {
    booksToSend = booksToSend.filter(
      (books) =>
        books.authors.toLowerCase().indexOf(authors.toLowerCase()) !== -1
    );
  }
  if (title) {
    booksToSend = booksToSend.filter(
      (books) => books.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
    console.log(title);
  }
  if (!booksToSend) {
    res.status(404).json("No books was found here");
  } else {
    res.json({
      response: booksToSend,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
