import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// Defines the port the app will run on (default is 8080)
const port = process.env.PORT || 4040
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Endpoints/route that return a collection of results
app.get('/', (request, response) => {
  response.send('Welcome to my book API')
})

// Endpoint/route that return the first 200 books in the data 
app.get('/books', (request, response) => {
  const firstBooks = booksData.slice(0, 200)
  response.json(firstBooks)
})

// Endpoint/route that return a single book based on the ID
app.get('/books/id/:id', (request, response) => {
  const id = request.params.id
  const specificBook = booksData.find((specificBook) => specificBook.bookID === +id)
    
    response.json(specificBook)
})

// Endpoint/route that return a specific author
app.get('/books/authors/:author', (request, response) => {
  const author = request.params.author
  const filteredAuthors = booksData.filter((item) => item.authors.includes(author))
    
    response.json(filteredAuthors)
})

// Endpoint/route that return the top ten books with a rating over 4
app.get('books/top-ten', (request, response) => {
  const sortedOnRating = booksData.filter((item) => item.average_rating >= 4)
  let topTenBooks = sortedOnRating.slice(0,10)

    response.json(topTenBooks)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
