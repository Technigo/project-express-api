import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import booksData from './data/books.json' 

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// First endpoint 
// The app.get method takes two arguments - the path and a call back function, which can be used by the frontend.
app.get('/', (req, res) => {
  res.send('This is an API with book rating data')
})

// A list of all endpoints
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint for all books, with all data (from json file)
app.get('/books', (req, res) => {
  res.json(booksData)
})

// A specific book, using params
app.get('/books/:id', (req, res) => {
  const { id } = req.params

  const book = booksData.find(item => item.bookID === +id)

  if (!book) {
    res.status(404).send('No book found with this ID')
  } else {
    res.json(book)
  }
})

// Endpoint for all authors, in alpabetical order
app.get('/books/authors/:authors/', (req, res) => {

  const allAuthors = booksData.map(item => item.authors).sort()
  res.json(allAuthors)
})

// Endpoint for all book titles, in alpabetical order
app.get('/books/title/:title/', (req, res) => {

  const allTitles = booksData.map(item => item.title).sort()
  res.json(allTitles)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
