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

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('This is a backend to show the most famous books')
})

//to see all books
app.get('/books', (req, res) => {
  res.json(booksData)
})

//to see a book with a specific id
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params
  const showBookID = booksData.filter((item) => item.bookID === +bookID)

  if (!showBookID) {
    res.status(404)
  } else {
    res.json(showBookID)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
