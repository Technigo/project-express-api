import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express ()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// ROUTES //
//Routpath
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//endpoint all books
app.get('/books', (req, res) => {
  const { author, language_code } = req.query
  if (author) {
    const booksData = booksData
    .filter(book => book.authors.toLowerCase().indexOf(author.toLowerCase())!== -1)
  }

if (language_code){
  const booksData = booksData
  .filter(book => book.language_code === language.code)
}

res.json({ length: booksData.length, data: booksData });
})

//endpoint one book
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find( books => books.bookID === +id)
  if (book) {
    res.json({ data: book })
  } else {
    res.status(404).json({ error: 'no book found' })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})