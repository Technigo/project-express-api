import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksData from './data/books.json';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Routes start here:
// Home: path /
app.get('/', (req, res) => {
  res.send("Hello world, this is Vanessa's books API!")
});

//Books: path /books - narrow down the data to the top 50 books from the 
// booksData object
app.get('/books', (req, res) => {
  res.json(booksData.slice(0, 50))
});

// Show a single book based on the ID: example path /books/7
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID;
  const singleBook = booksData.find((item => item.bookID === +bookID));

  if (!singleBook) {
    res.send("Sorry, could not find that book :(")
  };
  
  res.json(singleBook);
});

// Show 20 Books with rating higher than 4: path /top-rated
app.get('/top-rated', (req, res) => {
  const topRatedBooks = booksData.filter((item) => item.average_rating >= 4);
  let firstTwentyTopBooks = topRatedBooks.slice(0, 20);

  // Set a filter via query parameter - path example: localhost:8080/top-rated?quickRead=true
  // From the Top Rated Books, which ones are a quick read? Meaning they have less than 600 pages
  // If there is a quickRead query in the URL, respond with only the books with less than 600
  // pages from the firstTwentyTopBooks array
  const quickRead = req.query.quickRead;

  if (quickRead) {
    firstTwentyTopBooks = firstTwentyTopBooks.filter((item) => item.num_pages <= 600);
  };

  res.json(firstTwentyTopBooks);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
