import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const book = booksData.find(item => {
    return (item.bookID === +id)
  })
  if (book) {
    return res.json(book)
  } else {
    return res.status(404).json({ error: 'Cannot find the book you are looking for' })
  }
})

app.get('/author/:author', (req, res) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter((item) => item.authors.toLowerCase().includes(author))
  res.json(booksByAuthor)
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
