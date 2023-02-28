import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Route for start page
app.get('/', (req, res) => {
  // For now, start page lists the two routes available:
  res.json(listEndpoints(app));

  // Start page for once the frontend is ready:
  //res.send("Welcome to ReadIt! - See this API live at: https://xxxxxxxx.netlify.app/")
});

// Function for pagination, to be used later:
const pagination = (data, pageNumber) => {
  const pageSize = 15
  const startIndex = (pageNumber-1) * pageSize
  const endIndex = startIndex + pageSize
  const itemsOnPage = data.slice(startIndex, endIndex)

  const returnObject = {
      page_size: pageSize,
      page: pageNumber,
      num_of_pages: Math.ceil(data.length / pageSize),
      items_on_page: itemsOnPage.length,
      results: itemsOnPage
  }
  return returnObject
}

// Route that returns all data on all books
app.get('/books', (req, res) => {
  
  //FILTERS:
  const { author, top, page } = req.query

  let allBooks = booksData;

  if (page) {
    allBooks = pagination(allBooks, page)
  }

  // for specific author: e.g. /books?author=douglas adams
  if (author) {
    allBooks = allBooks.filter((book) => 
      book.authors.toLocaleLowerCase()
      .includes(author.toLocaleLowerCase()))
  }

  // for top-rated books: e.g. /books?top=true
  if (top) {
    allBooks = allBooks.filter((book) => 
      book.average_rating > '4.3')
  } 
  if (allBooks.length === 0) {
		res.status(404).json("Sorry we couldn't find any match for your search")
	} else res.status(200).json({ booksData: allBooks })
});

// Route for a single book based on id 
app.get("/books/:id", (req, res) => {
  const id = req.params.id
  const singleBook = booksData.find((book) => {
    return book.bookID === +id})

  if (!singleBook) {
    res.status(404).json("Sorry we couldn't find a book with that id")
	} else res.status(200).json({ book: singleBook }) 
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});