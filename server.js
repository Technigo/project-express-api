/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// import express, { request, response } from 'express'
import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// Shows a list of the endpoints
app.get('/', (request, response) => {
  response.send(listEndpoints(app))
})

// 1. Returns all books
// app.get('/books', (request, response) => {
//   response.json(booksData)
// })

// Query for authors or title
app.get('/books', (request, response) => {
  if (request.query.author) {
    const { author } = request.query
    const filteredAuthor = booksData.filter(
      (book) => book.authors.toLowerCase().includes(author.toLowerCase())
    )
    if (filteredAuthor.length === 0) {
      response
        .status(404)
        .json(`Sorry, couldn't find any books by ${author}`)
    } else {
      response.json(filteredAuthor)
    }
  } else if (request.query.title) {
    const { title } = request.query
    const filteredTitle = booksData.filter(
      (book) => book.title.toString().toLowerCase().includes(title.toString().toLowerCase())
    )
    if (filteredTitle.length === 0) {
      response
        .status(404)
        .json(`Sorry, couldn't find a book with title ${title}`)
    } else {
      response.json(filteredTitle)
    }
  }
})
// Path to a single book, by ID
app.get('/books/:id', (request, response) => {
  const { id } = request.params
  const findBook = booksData.find((book) => book.bookID === +id)

  if (findBook) {
    response.json(findBook)
  } else {
    response.json(`There's no book with id number ${id}`)
  }
})

// Path isbn and isbn13
app.get('/isbn/:isbn', (request, response) => {
  const { isbn } = request.params
  const { isbn13 } = request.params
  const findIsbn = booksData.find((book) => book.isbn === +isbn)
  const findIsbn13 = booksData.find((book) => book.isbn13 === +isbn13)

  if (findIsbn) {
    response.json(findIsbn)
  } else if (findIsbn13) {
    response.json(findIsbn13)
  } else {
    response.json("There's no book with that isbn/isbn13-number")
  }
})

// endpoint to get array of titles
app.get('/titles/:title', (request, response) => {
  const { title } = request.params
  const booksList = booksData.filter((book) => book.title.toLowerCase() === title.toLowerCase())

  if (booksList) {
    response.json(booksList)
  } else {
    response.status(404).json({ message: `${title} not found` })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
