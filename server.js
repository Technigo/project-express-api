import express from 'express'
import bodyParser from 'body-parser/'
import cors from 'cors'
import booksData from './data/books.json'


const port = process.env.PORT || 8080
const app = express()

// Middlewares added to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Defining routes
app.get('/', (req, res) => {
  res.send('Book Reviews')
})

//get a list of books from json file
app.get('/books', (req, res) => {
  res.json(booksData)
})

//get a specific book based on id
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params

  const bookId = booksData.find(book => book.bookID === +id)

  if (!bookId) {
    res.status(404).json('No book found with that id')
  } else {
    res.json(bookId)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
