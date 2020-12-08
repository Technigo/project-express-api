import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
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
  res.json(uniqueAuthors);
})

app.get('/authors/:author/books', (req, res) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors.includes(author));
  res.json(booksByAuthor);
})

app.get('/books', (req, res) => {
  res.json(booksData);
})

app.get('/books/:book', (req, res) => {
  const bookId = parseInt(req.params.book);
  const book = booksData.filter(item => item.bookID === bookId);
  res.json(book);
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
