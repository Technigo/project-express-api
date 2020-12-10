import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const ERROR_404 = 'ERROR: Could not find'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send(booksData)
})

app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if (!book) {
    res.status(404).json(ERROR_404)
  } else {
    res.json(book)
  }

})

app.get('/books/:title', (req, res) => {
  const { title } = req.params
  const filterBooks = booksData.filter((book) => {
    const bookTitle = `${book.title}`.toLowerCase()
    return bookTitle.includes(title.toLowerCase())
  })
  res.send(filterBooks)
})


















app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
