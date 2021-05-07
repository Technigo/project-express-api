import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

const BOOKS_NOT_FOUND = { error: 'No books where found'} 
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hi and welcome to my book review site. To get the full list use the endpoint /books')
})

app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find(book => book.bookID === +bookId)
  if (!book) {
    response.status(404).json(BOOKS_NOT_FOUND)
  }
  res.json(book)
})

app.get('/authors/:author', (req, res) => {
  const { author } = req.params
  const byAuthor = booksData.filter(book => book.authors === author)
  if (!byAuthor.length) {
    response.status(404).json(BOOKS_NOT_FOUND)
  }
  res.json(byAuthor)
})

app.get('/title/:title', (req, res) => {
  const { title } = req.params
  const bookTitle = booksData.filter(item => item.title === title)
  if (!bookTitle.length) {
    response.status(404).json(BOOKS_NOT_FOUND)
  }
  res.json(bookTitle)
})

app.get('/toplist/:nrOfBooks', (req, res) => {
  const nrOfBooks = req.params
  const ratedBooks = [...booksData];
  ratedBooks.sort((a, b) => b.average_rating - a.average_rating)
  const topList = ratedBooks.slice(0, nrOfBooks);
  res.json(topList)
})

app.get('/language/', (request, response) => {
  const { lang } = request.query;
  const filteredLanguage = booksData.filter((book) => book.language_code === lang);
  response.json(filteredLanguage);
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
