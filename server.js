import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/books', (req, res) => {
  const { title, authors, isbn } = req.query
  console.log(req.query)

  let filteredBooksData = booksData

  if (title) {
    filteredBooksData = filteredBooksData.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    )
  }

  if (authors) {
    filteredBooksData = filteredBooksData.filter(
      (item) => item.authors.toLowerCase().indexOf(authors.toLowerCase()) !== -1
    )
  }

  if (isbn) {
    filteredBooksData = filteredBooksData.filter(
      (item) => item.isbn.indexOf(isbn) !== -1
    )
  }

  res.json({
    response: filteredBooksData,
    success: true
  })
})

app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const bookIsbn = booksData.find((book) => book.isbn === +isbn)

  if (!bookIsbn) {
    res.status(404).send('No book with this ISBN was found.')
  } else {
    res.json(bookIsbn)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
