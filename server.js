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
  const { 
    author, 
    title, 
    highToLow, 
    lowToHigh, 
    longStory, 
    shortStory, 
    topTwenty, 
    topFiFtyRatingsCount, 
    isbn 
  } = req.query 

  let queriedBooks = booksData 

  // Query to find author.
  if (author) {
    queriedBooks = queriedBooks
      .filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  } 
  // query for title
  if (title) {
    queriedBooks = queriedBooks
      .filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  }
  // query to sort the books from high to low in average rating. 
  if (highToLow) {
    queriedBooks = queriedBooks
      .filter((book) => book.average_rating)
      .sort((a, b) => b.average_rating - a.average_rating)
  }
  // query to sort the books from low to high in average rating.
  if (lowToHigh) {
    queriedBooks = queriedBooks
      .filter((book) => book.average_rating)
      .sort((a, b) => a.average_rating - b.average_rating)
  }
  // query to show books over or equal to 400 pages
  if (longStory) {
    queriedBooks = queriedBooks
      .filter((book) => book.num_pages >= 400)
  }
  // query to show books under or equal to 400 pages
  if (shortStory) {
    queriedBooks = queriedBooks
      .filter((book) => book.num_pages <= +400)
  }
  // listing the top 20 highest rated books, in descending order
  if (topTwenty) { 
    queriedBooks = queriedBooks
      .filter((book) => book.average_rating)
      .sort((a, b) => b.average_rating - a.average_rating)
      .slice(0, 20)
  }
  // listing the top 50 books with most ratings, in descending order
  if (topFiFtyRatingsCount) {
    queriedBooks = queriedBooks
      .filter((book) => book.ratings_count)
      .sort((a, b) => b.ratings_count - a.ratings_count)
      .slice(0, 50)
  }
  // query to search for book by isbn
  if (isbn) {
    queriedBooks = queriedBooks.find((book) => book.isbn === +isbn)
    if (!queriedBooks) {
      res.status(404).json(`There is no book with isbn number ${isbn}`)
    }
  } else {
    res.status(200).json({ length: queriedBooks.length, data: queriedBooks })
  }
})

// endpoint to get one book based on id param
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find((book) => book.bookID === +id)
  if (!book) {
    res.status(404).send(`There is no book with id number ${id}`)
  } else {
    res.json({ data: book })
  }
})

// Start the server
app.listen(port, () => {})
