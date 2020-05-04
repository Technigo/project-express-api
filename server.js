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

// Start defining your routes here
app.get('/', (req, res) => {
  res.json('Hello world')
})

app.get('/books', (req, res) => {
  res.json(data)
})


app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = data.filter((item) => item.bookID === +bookId)

  // Ensure that no empty objects are shown
  if (book.length !== 0) {
    res.json(book)
    // If book was not found
  } else {
    res.status(404).send(`No book found with id ${bookId}`)
  }
})

app.get('/authors/:author', (req, res) => {
  const author = req.params.author
  const showRating = req.query.rating
  let booksByAuthor = data.filter((item) => item.authors === author)

  // Rating query
  if (showRating) {
    booksByAuthor = booksByAuthor.filter((item) =>
      item.average_rating.toFixed(1) === showRating
    )
  }

  res.json(booksByAuthor)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
