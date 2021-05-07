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
  code: 404,
  error: "Not Found",
  description: "This resource does not exist."
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Available endpoints: /books (query params: title, author), /books/{bookID}, /highestRated (query params: minRatingCount), /top50')
})

// endpoint for all books
app.get("/books", (req, res) => {
  const { title } = req.query
  const { author } = req.query
  let books = booksData.sort((a, b) => a.bookID - b.bookID)

  if (title) {
    // checks if book.title is a string (because some are not!)
    books = books.filter((book) => typeof book.title === "string")
    // checks for title
    books = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))
  }

  if (author) {
    // checks for author
    books = books.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  if (books.length === 0) {
    // displays 404 error message if author or title search has no results
    res.status(404).json(notFound)
  } else {
    res.json(books)
  }
})

// endpoint for one book by id
app.get("/books/:id", (req, res) => {
  const id = +req.params.id
  const bookById = booksData.find((book) => book.bookID === id) // checks for id

  if (!bookById) {
    // displays 404 error message if id has no match
    res.status(404).json(notFound)
  } else {
    res.json({ data: bookById })
  }
})

// endpoint for highest rated books
// search query minRatingCount to filter for a minimum number of ratings
app.get("/highestRated", (req, res) => {
  // sorts by highest rating
  let highestRatedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating)

  const { minRatingCount } = req.query

  if (minRatingCount) {
    // includes only results above specified rating count
    highestRatedBooks = highestRatedBooks.filter((book) => book.ratings_count >= minRatingCount)
  }
  res.json(highestRatedBooks)
})

// endpoint for top 50 highest rated books with above 1000 ratings
app.get("/top50", (req, res) => {
  // sorts by highest rating
  let highestRatedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating)

  // includes only results above 1000 rating counts
  highestRatedBooks = highestRatedBooks.filter((book) => book.ratings_count >= 1000)

  // takes first 50
  const top50 = highestRatedBooks.slice(0, 50)

  res.json(top50)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
