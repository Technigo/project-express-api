import express from "express";
import cors from "cors";
// import technigoMembers from "./data/technigo-books.json";

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
// To list all endpoints in the app
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("req", req);
  // console.log("res", res);
  res.send({
    "Books API": "Look for books by ID, ISBN number or title",
    Routes: [
      {
        "/books": "Get all books",
        "/books/isbn/:isbn": "Get a book by its ISBN number",
        "/books/id/:BooksID": "Get a book by its ID number in the database",
        "/books?authors=:author": "Filter a book by its author/authors",
        "/books?title=:title": "Filter a book by its title",
        "/books?language_code=:language_code":
          "Filter a book by its language code",
      },
    ],
  });
  // List all endpoint on first page
  // res.json(listEndpoints(app));
});
// Books endpoint
app.get("/books", (req, res) => {
  // queary parameters: we will deploy a new response
  const { title, authors, language_code } = req.query;
  let books = booksData;
  // filter method to deploy more results with same authors or title
  if (authors) {
    books = books.filter((singleAuthor) => {
      return singleAuthor.authors.toLowerCase() === authors.toLowerCase();
    });
  }
  if (title) {
    books = books.filter((singleBook) => {
      return singleBook.title.toLowerCase() === title.toLowerCase();
    });
  }
  if (language_code) {
    books = books.filter((language) => {
      return (
        language.language_code.toLowerCase() === language_code.toLowerCase()
      );
    });
  }
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: books,
    },
  });
});

// Books by ISBN endpoint using path parameter
app.get("/books/isbn/:isbn", (request, response) => {
  // find method will return the first object that fits descrition
  const bookByISBN = booksData.find((book) => {
    return book.isbn === Number(request.params.isbn);
  });
  if (bookByISBN) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: bookByISBN,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "ISBN not Found",
      body: {},
    });
  }
});

// Books/bookID endpoint
app.get("/books/id/:bookID", (request, response) => {
  // find method will return the first object that fits descrition
  const singleBook = booksData.find((book) => {
    return book.bookID === Number(request.params.bookID);
    // return book.id === +request.params.id;
    // return book.id.toString() === request.params.id;
    // return book.id === request.params.id;
  });
  if (singleBook) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book: singleBook,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "ID not Found",
      body: {},
    });
  }
});

app.get("/books/rating/:average_rating", (request, response) => {
  // find method will return the first object that fits descrition
  const ratingAverage = booksData.find((book) => {
    return book.average_rating === Number(request.params.average_rating);
    // return book.id === +request.params.id;
    // return book.id.toString() === request.params.id;
    // return book.id === request.params.id;
  });
  if (ratingAverage) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book: ratingAverage,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "ID not Found",
      body: {},
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// baseURL = http://localhost:8080
// baseURL?firstQuearyParam=FirstQuearyParamValue&secondQuearyParam=SecondQuearyParamValue&...&thQuearyParam=nthQuearyParamValue
// baseUrl/pathParamValue?firstQuearyParam=FirstQuearyParamValue&secondQuearyParam=SecondQuearyParamValue&...&thQuearyParam=nthQuearyParamValue
