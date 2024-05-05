import express from "express";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.get(`/books`, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filterBooks = [...booksData];
  const authorSearch = req.query.author;
  const languageSearch = req.query.lang;
  const ratingSearch = parseFloat(req.query.rating);

  filterBooks = filterBooks.filter((item) => {
    // Check if the book matches the author search criteria
    const authorMatch = !authorSearch || item.authors.toLowerCase().includes(authorSearch.toLowerCase());

    // Check if the book matches the language search criteria
    const languageMatch = !languageSearch || item.language_code.toLowerCase().includes(languageSearch.toLowerCase());

    // Check if the book matches the rating search criteria
    const ratingMatch =
      !ratingSearch || (item.average_rating >= ratingSearch && item.average_rating < ratingSearch + 1);

    // Return true if the book matches all criteria
    return authorMatch && languageMatch && ratingMatch;
  });

  if (filterBooks.length > 0) {
    const paginatedBooks = filterBooks.slice(startIndex, endIndex);
    res.json(paginatedBooks);
  } else {
    res.status(404).send("No books was found, based on your search.");
  }
});

// Title endpoint
app.get(`/titles/:title`, (req, res) => {
  const title = req.params.title.toLowerCase();
  const bookTitle = booksData.filter((item) => item.title.toLowerCase().includes(title));
  if (bookTitle) {
    res.json(bookTitle);
  } else {
    res.status(404).send("No books was found, based on your search.");
  }
});

//Endpoint for bookpages
app.get(`/bookpages/:bookpages`, (req, res) => {
  const pages = parseInt(req.params.pages);
  const numberOfPages = booksData.filter((item) => item.num_pages >= pages && item.num_pages < pages + 100);
  if (numberOfPages) {
    res.json(numberOfPages);
  } else {
    res.status(404).send("No books was found, based on your search.");
  }
});

// Endpoint for isbn
app.get(`/isbn/:isbn`, (req, res) => {
  const isbn = req.params.isbn;
  const isbnNumber = booksData.find((item) => item.isbn === +isbn);
  if (isbnNumber) {
    res.json(isbnNumber);
  } else {
    res.status(404).send("No book was found, based on your search.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
