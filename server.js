import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import books from './data/books.json'

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

app.get('/books', (req, res) => {
  let resBooks = books
  const language = req.query.lang
  const titleQuery = req.query.title
  const rating = req.query.rating

  if (rating === 'asc') {
    resBooks = resBooks.sort(function (a, b) { return a.average_rating - b.average_rating })
  } else if (rating === 'desc') {
    resBooks = resBooks.sort(function (a, b) { return b.average_rating - a.average_rating })
  }

  if (language) {
    resBooks = resBooks.filter(book => book.language_code === language)
  }

  if (titleQuery) {
    resBooks = resBooks.filter(book => book.title.toString().toLowerCase().includes(titleQuery.toLowerCase()))
  }

  res.send(resBooks)
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id

  const book = books.filter((book) => book.bookID === +id)

  res.send(book)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})