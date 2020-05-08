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
  res.send('Book reviews')
})

// all DATA
//http://localhost:8080/review
app.get('/review', (req, res) => {
  res.json(booksData)
})

// filter by ID
//http://localhost:8080/review/1
app.get('/review/:id', (req, res) => {
  const bookId = req.params.id
  const reviewId = booksData.find((book) => book.bookID === +bookId)

  if (reviewId) {
    res.json(reviewId);
  } else {
    res.status(404).send('Not found')
  }
})

// filter by AUTOR
//http://localhost:8080/authors/J.K.%20Rowling-Mary%20GrandPr%C3%A9
app.get('/authors/:authors', (req, res) => {
  const authors = req.params.authors
  const booksWrittenByAuthors = booksData.filter((book) => book.authors === authors)
  res.json(booksWrittenByAuthors)

  if (booksWrittenByAuthors) {
    res.json(booksWrittenByAuthors);
  } else {
    res.status(404).send('Not found')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
