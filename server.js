import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksData from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');      //Change this into an appropriate message
});

app.get('/books', (req, res) => {
  const { author } = req.query;    //maybe you can add more queries within the braces
  
  if (author) {
    const booksList = booksData.filter((book) => book.authors.includes(author));
    res.json(booksList);      //?author=J.K.Rowling
  }
  
  res.json(booksData);
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if (!id) {
    res.status(404).send(`No book with id number ${id}`)
  }

  res.json(book)
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
