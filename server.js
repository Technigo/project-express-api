import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here- home screen
app.get("/", (req, res) => {
  res.json(listEndpoints(app))
});

// reusable function to get data from array
const getBooksData = (prop, filterCriteria, filterProp) => {
  let filteredData = booksData;
  if (filterCriteria && filterProp) {
    filteredData = booksData.filter(book => book[filterProp] > filterCriteria);
  }
  const data = filteredData.map(book => book[prop]);
  if (data) {
    return {
      success: true,
      message: "OK",
      body: {
        [prop]: data
      }
    }
  } else {
    return {
      success: false,
      message: "Something went wrong",
      body: {}
    };
  }
}

// filter books show books with ratings higher than 4
app.get("/book-wellrated", (req, res) => {
  res.status(200).json(getBooksData('title', 4));
});


// get all book titles 
app.get("/book-titles", (req, res) => {
res.status(200).json(getBooksData('title'))
});

// get all authors 
app.get("/book-authors", (req, res) => {
res.status(200).json(getBooksData('authors'))     
});

// filter books show books with ratings higher than 4
app.get("/book-wellrated", (req, res) => {
  res.status(200).json(getBooksData('title', 4, 'average_rating'));
});

// find a book with a specific title
app.get("/book-titles/:title", (req, res) => {
  const { title } =req.params
  const bookTitle = getBooksData.filter((book) => book.title.toLowerCase().includes(title.toLocaleLowerCase()))
 
  if(!bookTitle) {
    res.status(404).json({
      message:"Sorry we could not find that title. Please search again",
      error:404 })
  }
  res.status(200).json(getBooksData);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
