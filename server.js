import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8083
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//all books in the data
app.get('/books', (req, res) => {
  res.json(booksData)
})

//id, get one book
app.get('/books/:id', (req, res) => {
  //id placeholder
  const id = req.params.id
  const bookId = booksData.filter((item) => item.bookID === +id)
  res.send(bookId)
})

//author, är det bättre med /books/authors/:authors
// app.get('/books/:authors', (req, res) => {
//   //author placeholder
//   const authors = req.params.authors
//   //använder placeholdern för att kunna filtrera ut de vi vill ha
//   const bookAuthors = booksData.filter((item) => item.authors === authors)
//   res.send(bookAuthors)
// })


//rating

// //pages
// app.get('/books/maxpages/:pages', (req, res) => {
//   //author placeholder
//   const pages = req.params.pages
//   //använder placeholdern för att kunna filtrera ut de vi vill ha
//   const maxPages = booksData.filter((item) => item.pages =< +pages)
//   res.send(maxPages)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
