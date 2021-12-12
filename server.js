import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('This is a backend to show the most famous books')
})

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

//to see all books
app.get('/books', (req, res) => {
  const { title, isbn } = req.query

  let booksDataToSend = booksData

  if (title) {
    booksDataToSend = booksDataToSend.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    )
  }

  if (isbn) {
    booksDataToSend = booksDataToSend.filter(
      (item) => item.isbn.indexOf(isbn) !== -1
    )
  }

  res.json({
    response: booksDataToSend,
    success: true,
  })
})

//to see a book with a specific id
app.get('/books/:bookID', (req, res) => {
  const { bookID } = req.params
  const showBookID = booksData.find((item) => item.bookID === +bookID)

  if (!showBookID) {
    res.status(404).send('No book found with that ID')
  } else {
    res.json(showBookID)
  }
})

//to see a list of books by a specific author
app.get('/author/:authors', (req, res) => {
  const { author } = req.params.authors
  const showAuthor = booksData.filter((item) => item.authors === author);
  res.json(showAuthor);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
