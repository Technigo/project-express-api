import express from 'express'
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
app.use(express.json())

// // Start defining your routes here
// app.get('/', (req, res) => {
//   res.send('Hello from Julia')
// })

// // Endpoint for all the books
// app.get('/books', (req, res) => {
//   res.json(booksData)
// })

// Endpoint to search one book by its id
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const selectedBook = booksData.find((item) => item.bookID === +bookId)
  if (!selectedBook) {
    res.status(404).send(`Sorry, there is no book with id number ${bookId}`)
  }
  res.json(selectedBook)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
