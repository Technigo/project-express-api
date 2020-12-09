import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// request is incoming an res is outgoing
// experimented with listEndpoints to list all routes

const ERROR_MESSAGE = 'No such book found'

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//returning all books. query params added.
//to String is needed since item.title is an object.
app.get('/books', (req, res) => {
  const { title, author } = req.query
  let filteredBooks = booksData

  if (title) {
    filteredBooks = booksData.filter(item => item.title.toString().toLowerCase().includes(title.toLowerCase())) 
  } 
  if (author) {
    filteredBooks = booksData.filter(item => item.authors.toString().toLowerCase().includes(author.toLowerCase()))
  }

  if (filteredBooks.length > 0) {
    res.json(filteredBooks)
  } else{
    res.status(404).json({ message: ERROR_MESSAGE })
  }
})

/*const test = ( author, authors) => {
    return filteredBooks = booksData.filter(item => item.authors.toString().toLowerCase().includes(author.toLowerCase())) 
}*/

//returning a single book
// using find instead of filter since I only want one result
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find((item) => item.bookID === +id)

  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: ERROR_MESSAGE })
  }
})

//returning a single book
/*QUESTION--> this function does the exact same thing as the one above but with different values. can I add other params in here and invoke the function with the values instead? */
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const book = booksData.find((item) => item.isbn === +isbn)

  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: ERROR_MESSAGE })
  }
})
//use this as a query param instead
app.get('/books/rating/:high', (req, res) => {
  const { high } = req.params
  const highRating = booksData.sort((a,b) => b.average_rating-a.average_rating)
  res.json(highRating)
})

/*const sortedBooksOnRating = booksData.sort(function (a, b) { return b.average_rating - a.average_rating })*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
