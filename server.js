import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
// Leaving below in purpose of learning:
// import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden. When starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Importing the 'express-list-endpoints' module to generate a list of available endpoints for documentation
const listEndpoints = require("express-list-endpoints")

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());



// ****** Defining routes starts here ****** //

// Defining a route for the default endpoint ("/") which displays available endpoints/documentation for the API
app.get("/", (req, res) => {
  const documentation = {
    endpoints: listEndpoints(app),
    additionalInfo: {
      "/books": {
        description: "Get a list of books with optional filtering.",
        queryParams: {
          author: "Filter books by author.",
          genre: "Filter books by genre.",
        },
        example: "/books?author=J.K.%20Rowling&genre=Fiction",
      },
    },
  };

  res.json(documentation);
});


// Defining the route ("/books") to fetch and return all books from the JSON data
app.get('/books', (req, res) => {
  // Get the query parameters from the request
  const { author, genre } = req.query;

  // Filter books based on query parameters
  let filteredBooks = booksData;

  if (author) {
    // If 'author' parameter is provided, filter books by author
    filteredBooks = filteredBooks.filter(book => book.author === author);
  }

  if (genre) {
    // If 'genre' parameter is provided, filter books by genre
    filteredBooks = filteredBooks.filter(book => book.genre === genre);
  }

  // Send the filtered books as the response
  res.json(filteredBooks);
});

// Defining a dynamic route ("/books/:bookID") to fetch information about a specific book by ID (to see a book in the browser, type e.g: ..../books/1)
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID
  // Finding the book with the matching ID from the data
  const book = booksData.find(book => book.bookID === parseInt(bookID))
  // Sending the book information if found, otherwise sending a 404 error
  if (book) {
    res.json(book)
  } else {
    res.status(404).send('Sorry, book not found, try another number')
  }
})
// **** Defining routes ends here **** //



// Starting the server on the specific port and loggins a message to the console. Used for localhost.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Logging additional messages to the console for testing purposes.
console.log("hello world")
console.log(booksData)
