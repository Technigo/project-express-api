import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import endpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()
const fs = require('file-system')

const ERROR_MSG = {
  error: 'no books found!'
}

const INPUT_ERROR = {
  error: 'invalid input!'
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

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

const validateBookInput = (bookDefinition, input) => {
  const result = bookDefinition.map((property) => {
    const test = input[property.fieldName]
    return {
      isValid: typeof test === property.fieldType,
      fieldName: property.fieldName
    }
  })
  return result
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(endpoints(app))
})

app.get('/books', (req, res) => {
  const language = req.query.lang
  const otherlanguages = req.query.otherlang

  if (language) {
    let booksInChosenLang = booksData.filter((item) => item.language_code === language)
    if (booksInChosenLang.length === 0) {
      res.status(404).json(ERROR_MSG)
    } res.json(booksInChosenLang)
  } else if (otherlanguages) {
    let booksInOtherLang = booksData.filter((item) => item.language_code != language)
    if (booksInOtherLang.length === 0) {
      res.status(404).json(ERROR_MSG)
    } res.json(booksInOtherLang)
  } res.json(booksData)

})

app.get('/books/:book', (req, res) => {
  const book = req.params.book
  const result = booksData.find((item) => item.bookID === +book)
  if (!result) {
    res.status(404).json(ERROR_MSG)
  }
  res.json(result)
})

app.post('/books', (req, res) => {
  const input = req.body
  const validationResult = validateBookInput(bookDefinition, input)
  const invalids = validationResult.filter((object) => !object.isValid)
  
  if (invalids.length === 0) {
    const result = JSON.parse(fs.readFileSync('./data/books.json'))
    result.push(input)
    const resultJSON = JSON.stringify(result)
    fs.writeFileSync('./data/books.json', resultJSON)
    res.status(200).json(validationResult)
  } else
      res.status(400).json(INPUT_ERROR)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
