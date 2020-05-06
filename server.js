import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


const listEndpoints = require('express-list-endpoints')


// Root
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})


// All books

app.get('/books', (req, res) => {
  const { title, author, rating, pages, sort } = req.query
  let books = data

  // Filter on title
  if (title) {
    books = books.filter((item) => {
      const bookTitle = item.title.toString() // Not sure why .toString() is neccessary
      return bookTitle.toLowerCase().includes(title.toLowerCase())
    })
  }

  // Filter on author
  if (author) {
    books = books.filter((item) =>
      item.authors.toLowerCase().includes(author.toLowerCase())
    )
  }

  // Filter on rating
  if (rating) {
    books = books.filter((item) =>
      item.average_rating.toFixed() === rating
    )
  }

  // Filter on number of pages
  if (pages) {
    books = books.filter((item) =>
      Math.floor(item.num_pages / 100) * 100 === +pages) // Round down to nearest 100
  }

  // Sorting
  if (sort) {
    if (sort === 'rating') { // Sort on best rating
      books = books.sort((a, b) => b.average_rating - a.average_rating);
    } else if (sort === 'pages') { // Sort on number of pages
      books = books.sort((a, b) => b.num_pages - a.num_pages);
    }
  }

  res.json(books)
})


// Single book by id

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const book = data.filter((item) => item.bookID === +id)

  // Ensure that no empty objects are shown
  if (book.length > 0) {
    res.json(book)
    // If book was not found
  } else {
    res.status(404).send(`No book found with id ${id}`)
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
