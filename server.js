import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Send list of all endpoints available in API
app.get('/', (req,res) => {
  res.send(listEndpoints(app))
})

// Endpoint to get all the books
app.get('/books', (req, res) => {
  
  let booksToSend = booksData
    if (req.query.author) {
      booksToSend = booksToSend.filter((book) => book.authors.toLowerCase().includes(req.query.author.toLowerCase()))  
  }

    if (req.query.title) {
      booksToSend = booksToSend.filter((book) => typeof book.title === "string")
      booksToSend = booksToSend.filter((book) => book.title.toLowerCase().includes(req.query.title.toLowerCase()))
  } 
    res.json({ data: booksToSend})
})

// Endpoint to get one book
app.get('/books/id/:id', (req, res) => { 
  
  // Destructuring path params
  const { id } = req.params

  // Find book with same id as id from path param  
  const queriedBook = booksData.find(book => book.bookID === +id)

   // Conditionally send different response to client
  if (queriedBook) {
    res.status(200).json({ data: queriedBook })
    } else {
      res.status(404).json({ error: 'Not found' })
    } 
  }) 

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})