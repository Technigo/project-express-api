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
  res.send("Hello world, welcome to Vanessa's Bookish API!")
});

// Books: path /books - narrow down the data to the first 50 books from the 
// booksData object
app.get('/books', (req, res) => {
  let fiftyBooks = booksData.slice(0, 50);

  // Set a filter via query parameter - path: /books?reviewersChoice=true
  // This query will show only books with more than 10,000 text reviews
  const reviewersChoice = req.query.reviewersChoice;

  if (reviewersChoice) {
    fiftyBooks = fiftyBooks.filter((item) => item.text_reviews_count > 10000);
  };

  res.json(fiftyBooks);
});

// Show 20 Books with rating higher than 4: path /books/top-rated
app.get('/books/top-rated', (req, res) => {
  const topRatedBooks = booksData.filter((item) => item.average_rating >= 4);
  let firstTwentyTopBooks = topRatedBooks.slice(0, 20);

  // Set a filter via query parameter - path: /books/top-rated?quickRead=true
  // From the Top Rated Books, which ones are a quick read? Meaning they have less than 600 pages
  // If there is a quickRead query in the URL, respond with only the books with less than 600
  // pages from the firstTwentyTopBooks array
  const quickRead = req.query.quickRead;

  if (quickRead) {
    firstTwentyTopBooks = firstTwentyTopBooks.filter((item) => item.num_pages <= 600);
  };

  res.json(firstTwentyTopBooks);
});

// Show books by a specific author - example path: /books/:authorName
app.get('/books/:authorName', (req, res) => {
  const authorName = req.params.authorName;
  const authorBooks = booksData.filter((item => item.authors === authorName));

  // If no books are found, the response is an empty array. Use that data to show an error message instead
  if (authorBooks.length === 0) {
    res.send("Sorry, could not find books by that author :( - The author name entered is incorrect")
  };
  
  res.json(authorBooks);
});

// Show a single book based on the ID - example path: /books/book/7
app.get('/books/book/:bookID', (req, res) => {
  const bookID = req.params.bookID;
  const singleBook = booksData.find((item => item.bookID === +bookID));

  if (!singleBook) {
    res.send("Sorry, could not find that book :( - The ID entered is incorrect")
  };
  
  res.json(singleBook);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
