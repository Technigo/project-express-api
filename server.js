import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Error messages

const notFound = {
  "code": 404,
  "message": "Not Found",
  "description": "This resource does not exist."
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get("/books", (req, res) => {
  const bookTitle = req.query.title
  const author = req.query.author
  let books = booksData.sort((a, b) => a.bookID - b.bookID)

  if (bookTitle) {
    books = books.filter((book) => typeof book.title === "string") // checks if book.title is a string (because some are not!)
    books = books.filter((book) => book.title.toLowerCase().includes(bookTitle)) // checks for title
  }

  if (author) {
    books = books.filter((book) => book.authors.toLowerCase().includes(author)) // checks for author
  }

  if (books.length === 0) {
    res.json(notFound) // displays 404 error message if author or title search has no results
  }

  res.json(books)
})

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id)
  const bookById = booksData.find((book) => book.bookID === id) // checks for id

  if (!bookById) {
    res.json(notFound) // displays 404 error message if id has no match
  }

  res.json(bookById)
})

app.get("/highestRated", (req, res) => {
  let highestRatedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating) // sorts by highest rating

  const minRatingCount = req.query.minRatingCount

  if (minRatingCount) {
    highestRatedBooks = highestRatedBooks.filter((book) => book.ratings_count >= minRatingCount) // includes only results above specified rating count
  }
  res.json(highestRatedBooks)
})

app.get("/top50", (req, res) => {
  let highestRatedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating) // sorts by highest rating

  highestRatedBooks = highestRatedBooks.filter((book) => book.ratings_count >= 1000) // includes only results above 1000 rating counts

  const top50 = highestRatedBooks.slice(0, 50) // takes first 50
  res.json(top50)
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
