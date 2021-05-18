import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import booksData from './data/books.json'
import { reset } from 'nodemon'

const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
  // res.json(booksData)
})

// endpoints to get all books
app.get('/books', (req, res) => {
  //queries to filter further
  const { author, language, title } = req.query

  if (author) {
    const booksByAuthor = booksData.filter((book) => book.authors.includes(author))
    res.json(booksByAuthor)
  } else if (language) {
    const booksByLanguage = booksData.filter((book) => book.language_code === language)
    res.json(booksByLanguage)
  } else if (title) {
    const booksByTitle = booksData.filter((book) => book.title.includes(title))
    res.json(booksByTitle)
  } else {
    res.json(booksData)
  }
})

// endpoint to get one book by id
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find((book) => book.bookID === +id)
  if (!book) {
    res.status(404).send(`No book here with id number ${id}`)
  }
  res.json(book)
})

// endpoint to get one book by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const book = booksData.find((book) => book.isbn === +isbn)
  if (!book) {
    res.status(404).send(`No book here with the isbn ${isbn}`)
  }
  res.json(book)
})

// endpoint to get all books in one language
app.get('/books/language/:language', (req, res) => {
  const { language } = req.params
  // queries to filter further
  const { rating } = req.query
  let titleInLanguage = booksData.filter((item) => item.language_code === language)
  if (!language) {
    res.status(404).send(`No books here in ${language}`)
  } else if (rating) {
    titleInLanguage = titleInLanguage.filter((item) => item.average_rating >= +rating)
    res.json(titleInLanguage)
  } else {
    res.json(titleInLanguage)
  }
})

// endpoint to get all books by one author
app.get('/books/author/:author', (req, res) => {
  const { author } = req.params
  // queries to filter further
  const { rating } = req.query
  let booksByAuthor = booksData.filter((book) => book.authors.includes(author))
  if (!booksByAuthor) {
    res.status(404).send(`No books here by ${author}`)
  } else if (rating) {
    booksByAuthor = booksByAuthor.filter((item) => item.average_rating >= +rating)
    res.json(booksByAuthor)
  } else {
    res.json(booksByAuthor)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
