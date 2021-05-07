import express from 'express'
//import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import books from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8083
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
//app.use(bodyParser.json())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint shows all books:
app.get('/books', (req, res) => {
  res.json(books)
})

// Endpoint that shows book with specific id
app.get('/books/:id', (req, res) => {
  const { id } = req.params;

  const getBook = books.find(book => book.bookID === +id)

  if (getBook) {
    res.json({ data: getBook })
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Endpoint that shows all authors in alphabetic order
app.get("/books/authors/", (req, res) => {
  const allAuthors = books.map((item) => item.authors).sort();
  res.json(allAuthors);
});

/*
app.get('/books/:authors', (req, res) => {
  const authors = req.params.authors
  const authorsFromList = books.filter((item) => item.authors === authors)
  res.json(authorsFromList)
})*/

app.get('/books', (req, res) => {
  const { author } = req.query

  const queriedBooks = books.filter(book => {
    return book.author.toLowerCase().indexOf(author.toLowerCase()) !== -1
  })

  res.json({ data: queriedBooks })
})
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
