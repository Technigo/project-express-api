import express, { request } from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint to get all books & serach for some specific. 
app.get('/books', (req, res) => {
  const { author, language_code } = req.query
  let booksList = booksData 
  
  if (author) {
    booksList = booksList
      .filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  //Trying to get the title but not wokring, will come back to this later to keep trying.
  // if (title) {
  //   booksList = booksList
  //     .filter(book => book.title.toLowerCase().includes(title.toLowerCase()))
  // }
  
  if (language_code) {
    booksList = booksList
      .filter(book => book.language_code === language_code)
  }

  res.json({ length: booksList.length, data: booksList })
})


// Endpoint to get one book.
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if (book) {
    res.json({data: book})
  } else {
    res.status(404).json({ error: 'Book not found'})
  }
  
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server is 🏃‍♀️ on http://localhost:${port}`)
})
