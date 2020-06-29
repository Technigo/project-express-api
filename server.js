import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Endpoints: /books/id, /books/')
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const bookId = booksData.find((item) => item.bookID === +id)

  if (!bookId) {
    res.status(404).send({ error: `No book with this id found, try another.` })
  }
  res.send(bookId)
})

app.get('/books', (req, res) => {

  const { author, title } = req.query
  let books = booksData

  if (author) {
    books = books.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase())
    )
  }

  if (title) {
    books = books.filter((item) => item.title.toString().toLowerCase().includes(title.toLowerCase())
    )
  }

  res.json(books)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})