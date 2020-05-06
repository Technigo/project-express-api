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

// Get all books
app.get('/books', (req, res) => {
  res.json(booksData)
})

// Filter books by minPages or maxPages
// Query: ?minPages=NUM or ?maxPage=NUM
app.get('/books/pages', (req, res) => {
  const minPages = req.query.minPages 
  const maxPages = req.query.maxPages 
  const booksByMinPages = booksData.filter((item) => item.num_pages >= minPages)
  const booksByMaxPages = booksData.filter((item) => item.num_pages <= maxPages)

  if(minPages) {
    res.json(booksByMinPages)
  } 
  if(maxPages) {
    res.json(booksByMaxPages)
  }
  
  res.json(booksData)
})

// Filter books by ID
app.get('/books/id/:id', (req, res) => {
  const id = req.params.id
  let booksById = booksData.filter((item) => item.bookID === +id)

  if( booksById.length > 0 ) {
    res.json(booksById)
  } else {
    res.status(404).json({ message: `Error, no book with id: ${id} found!` })
  }
})

// Filter books by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn
  let booksByIsbn = booksData.filter((item) => item.isbn === +isbn)

  if( booksByIsbn.length > 0 ){
    res.json(booksByIsbn)
  } else {
    res.status(404).json({ message: `Error, no book with isbn: ${isbn} found!` })
  }
})

// Show all books with average rating over NUM
app.get('/rating/:minRating', (req, res) => {
  const minRating = req.params.minRating
  let booksByRating = booksData.filter((item) => item.average_rating >= minRating)

  if(booksByRating.length > 0) {
    res.json(booksByRating)
  } else {
    res.status(404).json({ message: `Error, no books found with min rating of ${minRating}` })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
