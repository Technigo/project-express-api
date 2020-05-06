import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

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
  res.send('Endpoints: /books, /books/id')
})

//all books in the data
app.get('/books', (req, res) => {

  const { author, title } = req.query
  let books = booksData

  //find all authors that include
  if (author) {
    books = books.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase())
    )
  }

  //find all titles that include
  if (title) {
    books = books.filter((item) => item.title.toString().toLowerCase().includes(title.toLowerCase())
    )
  }

  res.json(books)
})

//id
app.get('/books/:id', (req, res) => {
  //id placeholder
  const id = req.params.id
  const bookId = booksData.find((item) => item.bookID === +id)

  if (!bookId) {
    res.status(404).send({ error: `No book with this id found, try another.` })
  }
  res.send(bookId)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
