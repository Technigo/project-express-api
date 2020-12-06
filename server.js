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

// Show a single book based on the ID: path /books/7
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID;
  const singleBook = booksData.find((item => item.bookID === +bookID));

  if (!singleBook) {
    res.send("Sorry, could not find that book :(")
  };
  
  res.json(singleBook);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
