import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/authors', (req, res) => {
  const authors = booksData.map(item =>item.authors)
  const uniqueAuthors = [...new Set(authors)]
  res.json(uniqueAuthors);
})

app.get('/authors/:author', (req, res) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors.includes(author));
  const authors = booksByAuthor.map(item => item.authors);
  const uniqueAuthors = [...new Set(authors)];
  if (uniqueAuthors.length === 0) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  res.json(uniqueAuthors);
})

app.get('/authors/:author/books', (req, res, next) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors.includes(author));
  if (booksByAuthor.length === 0) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  res.json(booksByAuthor);
})

app.get('/books', (req, res) => {
  res.json(booksData);
})

app.get('/books/:book', (req, res, next) => {
  const bookId = parseInt(req.params.book);
  const books = booksData.filter(item => item.bookID === bookId);
  if (books.length === 0) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
   }
  res.json(books)
})

app.use((req, res, next) => {
  const error = new Error(`Not found`);
  error.status = 404;
  next(error);
 });

 app.use((error, req, res, next) => {
   res.status(error.status || 500).send({
    error: {
    status: error.status || 500,
    message: error.message || "Internal Server Error",
   },
  });
 });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
