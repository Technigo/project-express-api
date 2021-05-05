import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// route to APIs first page listing all possible endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// endpoint to get all books
app.get('/books', (req, res) => {
  res.json({ data: booksData })
})

// endpoint with search path and query params
app.get('/books/search', (req, res) => {
  // destructuring query params 
  const { author } = req.query 
  const { highToLow } = req.query 
  const { lowToHigh } = req.query 
  const { longStory } = req.query 
  const { shortStory } = req.query 
  let queriedBooks = booksData 

  // Query to find author. Includes() makes it possible to write part of the authors name, and toLowerCase
  // makes the search case insensitive
  if (author) {
    queriedBooks = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
    if (!queriedBooks) {
      res.status(404).json(`No books from ${author}`)
      // if author does not exist send error message - does not show?
    }
  } 
  // query to sort the books from high to low in average rating. 
  if (highToLow) {
    queriedBooks = booksData.filter((book) => book.average_rating).sort((a, b) => b.average_rating - a.average_rating)
  }
  // query to sort the books from low to high in average rating.
  if (lowToHigh) {
    queriedBooks = booksData.filter((book) => book.average_rating).sort((a, b) => a.average_rating - b.average_rating)
  }
  // query to show books over or equal to 400 pages
  if (longStory) {
    queriedBooks = booksData.filter((book) => book.num_pages >= 400)
  }
  // query to show books under or equal to 400 pages
  if (shortStory) {
    queriedBooks = booksData.filter((book) => book.num_pages <= +400)
  }
  res.status(200).json({ data: queriedBooks })
})

// endpoint with different toplists depending on the query
app.get('/books/toplist', (req, res) => {
  const { topTwenty } = req.query
  const { ratingsCount } = req.query
  let toplist = booksData
  // listing the top 20 highest rated books, in descending order
  if (topTwenty) { 
    toplist = booksData.filter((book) => book.average_rating).sort((a, b) => b.average_rating - a.average_rating).slice(0, 20)
  }
  // listing the top 50 books with most ratings, in descending order
  if (ratingsCount) {
    toplist = booksData.filter((book) => book.ratings_count).sort((a, b) => b.ratings_count - a.ratings_count).slice(0, 50)
  }
  res.json({ data: toplist })
})

// endpoint to get books based on queried title 
app.get('/books/title', (req, res) => {
  const { title } = req.query
  const queriedTitle = booksData.filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  if (!queriedTitle) {
    res.status(404).send(`Sorry, there is no book with the title ${title}`)
  }
  res.json({ data: queriedTitle })
})

// endpoint to get one book based on ID parameter
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find((book) => book.bookID === +id)
  if (!book) {
    res.status(404).send(`No book with id number ${id}`)
  }
  res.json({ data: book })
})

// endpoint to get one book based on isbn parameter. 
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const bookIsbn = booksData.find((book) => book.isbn === +isbn)
  if (!bookIsbn) {
    res.status(404).send(`No book with isbn number ${isbn}`)
  }
  res.json({ data: bookIsbn })
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
