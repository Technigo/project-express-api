import express, { request } from "express";
import ListEndpoints from "express-list-endpoints";
import cors from "cors";

import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// ROUTES

// Main root is '/'
// ListEndPoints sending list of end points
app.get("/", (req, res) => {
  res.send(ListEndpoints(app));
});

// http://localhost:8080/books
// http://localhost:8080/books?author=J.K. Rowling-Mary GrandPré
// http://localhost:8080/books?title=Harry Potter and the Order of the Phoenix
// .lower case will enable searches like:
// http://localhost:8080/books?author=j.k.%20row (%20) is space in URL
// query param, if if searching for specific auther or title
// '/books' end point to get all books
// res.json the data always convert data to string

app.get("/books", (req, res) => {
  const { author, title } = req.query;
  if (author) {
    const booksList = booksData.filter((book) => {
      return book.authors.toLowerCase().includes(author.toLowerCase());
    });
    res.json(booksList);
  } else if (title) {
    const booksTitle = booksData.filter((book) => {
      return book.authors.toLowerCase().includes(title.toLowerCase());
    });
    res.json(booksTitle);
  }
  res.send(booksData);
});

// http://localhost:8080/books/book/1
// :id = param to trigger a param example console.log(req params)
// it will look for the specific param, in this case a specific id from booksData
app.get("/books/book/:bookID", (req, res) => {
  const { bookID } = req.params;
  const book = booksData.find((b) => b.bookID === +bookID);
  if (!book) {
    res.status(404).send(`error, there  is no book with this ${bookID}`);
  }
  res.json(book);
});

// http://localhost:8080/books/top-rated
// response till be top rated books sorted from top-ranked to least-top ranked
// slice() to show top 10 out of all rated books
app.get("/books/top-rated", (req, res) => {
  const bookRating = booksData.sort(
    (a, b) => b.average_rating - a.average_rating
  );
  res.json(bookRating.slice(0, 10));
});

// http://localhost:8080/books/pages
// response will be all books sorted accoring to page number from most pages to less
app.get("/books/pages", (req, res) => {
  const pageNumbers = booksData.sort((a, b) => b.num_pages - a.num_pages);
  res.json(pageNumbers);
});

// get books with page number in the search
// http://localhost:8080/books/pages/65 response will be all books over 65 pages sorted
app.get("/books/pages/:pageCount", (req, res) => {
  const { pageCount } = req.params;
  const pageNumber = booksData.filter((item) => item.num_pages === +pageCount);
  const sortedPages = pageNumber.sort((a, b) => b.num_pages - a.num_pages);

  if (!sortedPages) {
    res
      .status(404)
      .send(`error, we hav eno books with this amount of  ${pageCount}`);
  }
  res.json(sortedPages);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});

// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'
