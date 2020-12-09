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

// Books: path /books - implemented pagination, each page will show 50 books
// at a time (we have 500 books, so we have a max of 10 pages)
// path example: /books?p=1
app.get('/books', (req, res) => {
  const postCount = booksData.length;
  const perPage = 50;
  // pageCount: counts amount of pages we end up with depending on our data's length
  const pageCount = Math.ceil(postCount / perPage);

  // page: determines value for the p variable in query - path: /books?p=3
  let page = parseInt(req.query.p);
  if(page < 1) page = 1;
  // page value can't go over pageCount (pageCount is max amount of pages we have)
  if(page > pageCount) page = pageCount;

  // ex.: 44 - ((1 - 1) * 10) -1 = 43 (44 is count, 43 is index)
  const from = postCount - ((page - 1) * perPage) - 1;
  // ex.: 44 - (1 * 10) = 34
  let to = postCount - (page * perPage);
  if(to < 0) to = 0;

  res.json({
    books: booksData.slice(to, from),
    page,
    pageCount
  });
});

// Show books by a specific author - example path: /books/search?author=Dan&20Brown
// Added toLowerCase to make sure an author is found even if user types the name in lower case
app.get('/books/search', (req, res) => {
  const author = req.query.author;
  const authorBooks = booksData.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase()));

  // If no books are found, the response is an empty array. Use that data to show an error message instead
  if (authorBooks.length === 0) {
    res.status(404).json("Sorry, could not find books by that author name :(")
  };
  
  res.json(authorBooks);
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

// Shows from the first 50 books in our data, which ones have more than 10,000 reviews
// path: /books/reviews?choice=true
app.get('/books/reviews', (req, res) => {
  let fiftyBooks = booksData.slice(0, 50);
  const choice = req.query.choice;

  if (choice) {
    fiftyBooks = fiftyBooks.filter((item) => item.text_reviews_count > 10000);
  };

  res.json(fiftyBooks);
});

// Show a single book based on the ID - example path: /books/book/7
app.get('/books/book/:bookID', (req, res) => {
  const bookID = req.params.bookID;
  const singleBook = booksData.find((item) => item.bookID === +bookID);

  if (!singleBook) {
    res.status(404).json("Sorry, could not find books with that ID :(")
  };
  
  res.json(singleBook);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
