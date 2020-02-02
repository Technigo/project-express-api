import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// import goldenGlobesData from "./data/golden-globes.json";
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from "./data/books.json";
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// BOOKS API --> booksData

app.get("/books", (req, res) => {
  const searchString = req.query.search;

  let filteredBooks = booksData;

  if (searchString) {
    filteredBooks = filteredBooks.filter(item => {
      let itemTitle = item.title.toString().toLowerCase();
      let itemAuthor = item.authors.toString().toLowerCase();
      return (
        itemTitle.includes(searchString) || itemAuthor.includes(searchString)
      );
    });
  }

  console.log(searchString);
  res.json(filteredBooks);
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  let bookid = booksData.filter(item => item.bookID === +id);

  res.json(bookid);
});

app.get("/books/authors/:author", (req, res) => {
  const author = req.params.author;

  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter(item => {
      let itemAuthor = item.authors.toString().toLowerCase();
      return itemAuthor.includes(author);
    });
  }
  res.json(filteredBooks);
});

app.get("/booksInfo", (req, res) => {
  const searchRating = req.query.rating;
  const searchPages = req.query.pages;

  let rating = booksData.filter(
    item =>
      item.average_rating === +searchRating || item.num_pages === +searchPages
  );

  res.json(rating);
});

app.get("/books/pages/:pages", (req, res) => {
  const pages = req.params.pages;
  let bookid = booksData.filter(item => item.num_pages === +pages);

  res.json(bookid);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
