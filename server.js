import express, { response } from 'express'
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
const BOOKS_NOT_FOUND = { error: 'No books where found'} 
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hi and welcome to my book review site. To get the full list use the endpoint /books')
})

app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find(book => book.bookID === bookId)
  if (!book) {
    response.status(404).json(BOOKS_NOT_FOUND)
  }
  res.json(book)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
