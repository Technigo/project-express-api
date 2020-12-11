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
// used listEndpoints to list all routes

const ERROR_MESSAGE = 'No such book found'

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//returning all books. query params added.
//to String is needed since item.title is an object.
app.get('/books', (req, res) => {
  const { title, author, language_code, rating } = req.query
  let filteredBooks = booksData

  if (title) {
    filteredBooks = filterArray(title, 'title')
  } 
  if (author) {
    filteredBooks = filterArray(author, 'authors')
  }
  if (language_code) { 
    filteredBooks = filterArray(language_code, 'language_code')
  }
  if (rating === 'high') {
    filteredBooks = booksData.sort((a,b) => b.average_rating-a.average_rating)
  }
  if (rating === 'low') {
    filteredBooks = booksData.sort((a,b) => a.average_rating-b.average_rating)
  }

  if (filteredBooks.length > 0) {
    res.json(filteredBooks)
  } else{
    res.status(404).json({ message: ERROR_MESSAGE })
  }
})

//returning a single book by id
// using find instead of filter since I only want one result
app.get('/books/book/:id', (req, res) => {
  const { id } = req.params
  const book = findUniqueItem(id, 'bookID')

  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: ERROR_MESSAGE })
  }
})

//returning a single book by isbn
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const book = findUniqueItem(isbn, 'isbn')

  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: ERROR_MESSAGE })
  }
})

//function to filter array
const filterArray = ( valuteToFilter, propertyToFilter ) => {
  return booksData.filter(item => item[propertyToFilter].toString().toLowerCase().includes(valuteToFilter.toLowerCase())) 
}

//function for finding Item in array
const findUniqueItem = (valuteToFind, propertyToFind) => {
  return booksData.find((item) => item[propertyToFind] === +valuteToFind)
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
