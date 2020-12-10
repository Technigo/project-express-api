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

const INPUT_ERROR = {
  error: 'invalid input!'
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//function for validating input

const bookDefinition = [
  {
    fieldName: "bookID",
    fieldType: "number"
  },
  {
    fieldName: "title",
    fieldType: "string"
  },
  {
    fieldName: "authors",
    fieldType: "string"
  },
  {
    fieldName: "average_rating",
    fieldType: "number"
  },
  {
    fieldName: "isbn",
    fieldType: "number"
  },
  {
    fieldName: "isbn13",
    fieldType: "number"
  },
  {
    fieldName: "language_code",
    fieldType: "string"
  },
  {
    fieldName: "num_pages",
    fieldType: "number"
  },
  {
    fieldName: "ratings_count",
    fieldType: "number"
  },
  {
    fieldName: "text_reviews_count",
    fieldType: "number"
  }
]
//Currently missing something, only returns undefined
const validateBookInput = (bookDefinition, input) => {
  const result = bookDefinition.map((property) => {
    const test = input[property.fieldName]
    return {
      isValid: typeof test === property.fieldType,
      fieldName: property.fieldName
    }
  }) 
  const invalids = result.filter((object) => !object.isValid)
  if(invalids.length === 0){
    return result
  } return 'Invalid input'
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(endpoints(app))
})

app.get('/books', (req, res) => {
  const language = req.query.lang
  const otherlanguages = req.query.otherlang

  let filteredBooks = booksData
  if (language) {
    filteredBooks = booksData.filter((item) => item.language_code === language)
  } else if (otherlanguages) {
    filteredBooks = booksData.filter((item) => item.language_code != language)
  } res.json(filteredBooks)
})
//res.status(404).json(ERROR_MSG)

app.get('/books/:book', (req, res) => {
  const book = req.params.book
  const result = booksData.find((item) => item.bookID === +book)
  if (!result) {
    res.status(404).json(ERROR_MSG)
  }
  res.json(result)
})

//Currently not working properly due to function
app.post('/books', (req, res) => {
  const input = req.body
  const validationResult = validateBookInput(bookDefinition, input)
  if(!validationResult){
    res.status(400).json(INPUT_ERROR)
  }
  res.json(validationResult)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
