import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import endpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

/* const endpoints = require('express-list-endpoints') */
const ERROR_MSG = {
  error: 'no books found!'
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//function for validating input
const bookInputValidator = (book) => {
    for (const property in book){
      console.log(property, book[property])
    }
    /* const fieldsOfNumbers = {bookdID, average_rating, isbn, isbn13, num_pages, ratings_count, text_reviews_count}
  const fieldsOfStrings = {title, authors, language_code} */
  /* if (typeof(fieldsOfNumbers) === 'number' && typeof(fieldsOfStrings) === 'string'){
    console.log('valid input')
  } console.log('invalid input') */
  typeof(book.bookID) === 'number'? console.log('ID:', true): console.log('ID:', false)
  typeof(book.title) === 'string'?console.log('title:',true):console.log('title:',false)
  typeof(book.authors) === 'string'?console.log('author:',true):console.log('author:',false)
  typeof(book.average_rating) === 'number'?console.log('rating:',true):console.log('rating:',false)
  typeof(book.isbn) === 'number'?console.log('isbn:',true):console.log('isbn:',false)
  typeof(book.isbn13) === 'number'?console.log('isbn13:',true):console.log('isbn13:',false)
  typeof(book.language_code) === 'string'?console.log('lang:',true):console.log('lang:',false)
  typeof(book.num_pages) === 'number'?console.log('pages:',true):console.log('pages:',false)
  typeof(book.ratings_count) === 'number'?console.log('rating count:',true):console.log('rating count:',false)
  typeof(book.text_reviews_count) === 'number'?console.log('reviews:',true):console.log('reviews:',false)
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(endpoints(app))
})

app.get('/books', (req, res) => {
  const language = req.query.lang
  const otherlanguages = req.query.otherlang

  let filteredBooks = booksData
  if(language) {
    filteredBooks = booksData.filter((item) => item.language_code === language)
  } else if (otherlanguages){
    filteredBooks = booksData.filter((item) => item.language_code != language)
  }res.json(filteredBooks)
})
//res.status(404).json(ERROR_MSG)

app.get('/books/:book', (req, res) => {
  const book = req.params.book
  const result = booksData.find((item) => item.bookID === +book)
  if(!result) {
    res.status(404).json(ERROR_MSG)
  }
  res.json(result)
})

app.post('/books', (req, res) => {
  const input = req.body
  bookInputValidator(input)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
