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
app.get('/', (request, response) => {
  response.send(listEndpoints(app))
})

// endpoint to get all books
app.get('/books', (request, response) => {
  response.json(booksData)
})

// endpoint with path search and queries 
app.get('/books/search', (request, response) => {
  const { author } = request.query 
  const { highToLow } = request.query 
  const { lowToHigh } = request.query 
  const { longStory } = request.query 
  const { shortStory } = request.query 
  let queriedBooks = booksData 

  // Query to find author. Includes() makes it possible to write part of the authors name, and toLowerCase
  // makes the search case insensitive
  if (author) {
    queriedBooks = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
    if (!queriedBooks) {
      response.status(404).send(`No books from ${author}`)
      // if author does not exist send error message
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
  response.json(queriedBooks)
})

// endpoint to get one book based on ID parameter
app.get('/books/id/:id', (request, response) => {
  const { id } = request.params
  const book = booksData.find((book) => book.bookID === +id)
  if (!book) {
    response.status(404).send(`No book with id number ${id}`)
  }
  response.json(book)
})

// endpoint to get one book based on isbn parameter. Added extra path to both id and isbn to 
// resolve conflict
app.get('/books/isbn/:isbn', (request, response) => {
  const { isbn } = request.params
  const bookIsbn = booksData.find((book) => book.isbn === +isbn)
  if (!bookIsbn) {
    response.status(404).send(`No book with isbn number ${isbn}`)
  }
  response.json(bookIsbn)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
