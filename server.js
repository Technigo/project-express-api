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

//Route for all books
app.get('/books', (req, res) => {
  res.json(booksData)
})

//Route for finding a book by its id
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const bookByID = booksData.find(item => item.bookID === +id);
  res.json(bookByID)
})

//Route for finding books by author
app.get('/authors/:author', (req, res) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors === author);
  res.json(booksByAuthor);
})

//Route for finding books by rating
app.get('/rating/:rating', (req, res) => {
  const rating = req.params.rating;
  let booksByRating = booksData.filter(item => item.average_rating <= +rating);
  res.json(booksByRating)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
