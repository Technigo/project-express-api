import express, { request } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booksData from "./data/books.json";
// const port = 8080
// const app = express()
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
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

// ROUTES
// Start defining your routes here
//  get to get things form the API
// / Is the pat// a request and a reponse

// end point to get all books
// query param, if someone serach for one auther
app.get("/books", (req, res) => {
  const { author } = req.query;
  if (author) {
    const booksList = booksData.filter((book) => book.authors.includes(author));
    res.json(booksList);
  }
  res.send(booksData);
});

// end point in URL would look like books?authors=J.K. Rowling
// after = is always the query. first variable (?authors then = query)
// end point to get one book
// param : to trigger a param
// End point for average rating

// End point for all books and one book
app.get("/books/book/:id", (req, res) => {
  // console.log(req.params.id);
  const { id } = req.params;
  const book = booksData.find((b) => b.bookID === +id);
  if (!book) {
    res.status(404).send(`error, no book ${id}`);
  }
  res.json(book);
});

app.get("/books/top-rated", (req, res) => {
  const bookRating = booksData.sort(
    (a, b) => b.average_rating - a.average_rating
  );
  res.json(bookRating.slice(0, 10));
  // const bookRating = booksData.filter((item) => item.average_rating >= 3);
  // res.json(bookRating);
});

// page number intervals
// app.get("pages/0-500", (req, res) => {
// /*   const sortPages = booksData.sort((a, b) => b.num_pages - a.num_pages);
//  */  const pageNumber = booksData.filter(
//     (item) => item.num_pages > 0 && item.num_pages <= 500
//   );
//   res.json(pageNumber);
// });

app.get("books/pages/:pageCount", (req, res) => {
  // const sortPages = bookData.sort((a, b) => b.num_pages - a.num_pages);
  const { pageCount } = req.params;
  const pageNumber = booksData.filter((item) => item.num_pages > +pageCount);
  const sortedPages = pageNumber.sort((a, b) => b.num_pages - a.num_pages);
  res.json(sortedPages);
});

// Start the server
// takes two parameters
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
// Endpoints to be added: pages per page (max 20 per page)
// page number intervals
