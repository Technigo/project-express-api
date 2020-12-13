import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

const ERROR_BOOKS_NOT_FOUND = { error: 'No books were found.' }
const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to Saras book review site. To get full list use the endpoint /books')
})

//get all data
app.get('/books', (req, res) => {
  res.json(booksData)
})

//get a book bases on its id.
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find(book => book.bookID === +bookId)
  if (!book) {
    response.status(404).json(ERROR_BOOKS_NOT_FOUND)
  }
  res.json(book)
})

//sort books based on author
app.get('/authors/:author', (req, res) => {
  const {author} = req.params
  const booksByAuthor = booksData.filter(book => book.authors === author)
  if (booksByAuthor.length === 0) {
    res.status(404).json(ERROR_BOOKS_NOT_FOUND)
  }
  res.json(booksByAuthor)
})

//get a book based on title
app.get('/titles/:title', (req, res) => {
  const { title } = req.params
  const bookTitle = booksData.filter(item => item.title === title)
  if (bookTitle.length === 0) {
    res.status(404).json(ERROR_BOOKS_NOT_FOUND)
  }
  res.json(bookTitle);
})

//sort books by rating and set nr of books.
app.get('/toplist/:nrOfBooks', (req, res) => {
  const {nrOfBooks} = req.params
  const highRatedBooks = [...booksData];
  highRatedBooks.sort((a, b) => b.average_rating - a.average_rating)
  const topList = highRatedBooks.slice(0, nrOfBooks);
  res.json(topList)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
