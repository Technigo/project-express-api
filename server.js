import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(booksData)
})

app.get('/:bookID', (req, res) => {
  res.json(booksData.filter((book) => book.bookID === +req.params.bookID))
})

app.get('/max/:num_pages', (req, res) => {
  res.json(booksData.filter((book) => book.num_pages <= +req.params.num_pages))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
