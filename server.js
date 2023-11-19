import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";
 import booksData from "./data/books.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json({endpoints});
  
});

app.get(`/books`, (req, res) => {
  res.json(booksData);
});

app.get('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId

  const book = booksData.find(b => b.bookID === parseInt(bookId))
  if (book) {
      res.json(book)
  } else {
      res.status(404).send('Book not found')
  }})

app.get(`/rating/:average_rating`, (req, res) => {
  const  requestedRating = req.params.average_rating;

  let filteredBooks = booksData.filter(
    (item) => item.average_rating === +requestedRating
  );
  
  res.json(filteredBooks);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


