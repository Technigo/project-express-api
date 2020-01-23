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

// Start defining your routes here
app.get('/', (req, res) => {
  const welcomeMessage = `Welcome to Björn's BOOKS API !

    The following endpoints/paths (GET) are available:

    /books
    - returns all books in the dataset

    /books?minRating=X
    - returns all books with the minimum rating equal to or more than X

    /isbn/:isbn
    - returns the book with the given isbn number

    I was hoping for this this message to go on multiple lines since it's a string/template literal.
  `
  res.send(welcomeMessage)
})

app.get('/books', (req, res) => {
  const minRating = req.query.minRating

  if (minRating) {
    const booksByMinimumRating = booksData.filter(book => book.average_rating >= minRating)
    if (booksByMinimumRating.length > 0) {
      res.json(booksByMinimumRating)
    } else {
    res.send("No books found with the minimum rating of " + minRating + " Min[0] to Max[5]")
    }
  }

  res.json(booksData)
})

app.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn
  console.log(isbn)
  const bookByIsbn = booksData.find(book => book.isbn === +isbn)

  if (bookByIsbn) {
    res.json(bookByIsbn)
  } else {
    res.send("No book found with that isbn number.")
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
