import express, { request, response } from 'express'
import cors from 'cors'
import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('Hello from the other side')
})

app.get('/books', (request, response) => {
  const { author } = request.query
  if (author) {
    const bookList = booksData.filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))
    response.json(bookList)
  }
  response.json(booksData)
})

app.get('/books/:id', (request, response) => {
  const { id } = request.params
  const book = booksData.find( book => book.bookID === +id)
  if (!book) {
    response.status(404).send(`The book with id ${id} doesn't exist in this website`)
  }
  response.json(book)
})

app.listen(port, () => {
  console.log(`WOOP 🚀 Server running on http://localhost:${port}`)
})
