import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import booksData from './data/books.json'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-mongo"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Mongoose model of books
const Book = mongoose.model('Book', {
  bookID: Number,
  authors: String,
  authors: String,
  average_rating: Number,
  isbn: Number,
  isbn13: Number,
  language_code: String,
  num_pages: Number,
  ratings_count: Number,
  text_reviews_count: Number
})

if(process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Book.deleteMany({})

    booksData.forEach((bookData) => {
      new Book(bookData).save()
    })
  }
  seedDatabase()
}

//Return Error if connection fail
  app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

// Start defining the routes
app.get('/', (req, res) => {
  res.send('Books API')
})

// Return the array with all the book objects
app.get('/books', async (req, res) => {
  const { language } = req.query
  const queryAuthors = req.query.authors
  const queryRegex = new RegExp(queryAuthors, "i")

// Using query for language code
  if(language) {
    const searchLanguage = await Book.find({'language_code': language})
     if (searchLanguage.length) {
       res.json(searchLanguage)
     } else {
        res.status(404).json({ error: 'Language not found' })
     }
  }

// Query for authors
  const searchAuthor = await Book.find({'authors': queryRegex})
  if (searchAuthor.length) {
    res.json(searchAuthor)
  } else {
     res.status(404).json({ error: 'Author not found' })
  }
})

// Find Book with a specific ID
app.get('/books/id/:_id', async (req, res) => {
  const _id = req.params._id
  const findId = await Book.findOne({'_id': _id})
  if (findId.length) {
    res.json(findId)
  } else {
     res.status(404).json({ error: 'ID not found' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})