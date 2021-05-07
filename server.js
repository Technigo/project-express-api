import express from 'express'
import cors from 'cors'

import booksData from './data/books.json'
import listEndpoints from 'express-list-endpoints'


//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/books', (req, res) => {
  const { title, author, language_code } = req.query
  let booksToSend = booksData

  if (title) {
    booksToSend = booksToSend
      .filter(book => book.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
  }

  if (author) {
    booksToSend = booksToSend
      .filter(book => book.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1)
  }

  if (language_code) {
    booksToSend = booksToSend
      .filter(book => book.language_code === language_code)
  }

  res.json({ length: booksToSend.length, data: booksToSend })
})
//sample queries
// http://localhost:8080/books?author=adams
// http://localhost:8080/books?language_code=en-US
// http://localhost:8080/books?author=adams&language_code=en-US



app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const bookId = booksData.find((book) => book.bookID === +id)
  
  if (bookId) {
    res.json({ data: bookId })
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const bookIsbn = booksData.find((book) => book.isbn === +isbn)
  
  if (bookIsbn) {
    res.json({ data: bookIsbn })
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
