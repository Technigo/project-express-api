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
  res.send('Backend for booksData')
})

// Detta är från föreläsning Localhost/books/idnr ex 2
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)
  if (!book) {
    res.send(`nothing found with id {id}`)
  }
  res.json(book)
})

// den här gör att jag får error om header.. eller?
app.get('/books', (req, res) => {
  // det är det som är här nedan, author, som syns i browsern
  const { author } = req.query
  if (author) {
    const booksList = booksData.filter(book => book.authors.includes(author))
    res.json(booksList)
  }
  res.json(booksData)
})

// ta bort denna? ska vara find när vi bara ska ha ut en.
// Filter används när man vill ha ut en ny lista.
app.get('/id/:id', (req, res) => {
  const { id } = req.params;
  const book = booksData.filter((item) => item.bookID === parseInt(id, 10))
  res.json(book)
})

// använda query ? här istället?
app.get('/author/:author', (req, res) => {
  const { author } = req.params;
  const books = booksData.filter((item) => item.authors === author)
  res.json(books)
})

// endpoint to get the top 5 books sorted on rating
app.get('/top5', (req, res) => {
  const books = booksData.sort((a, b) => b.average_rating - a.average_rating);
  res.json(books.slice(0, 5))
})

// app.get('/rating', (req, res) => {
//   res.json(booksData)
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
