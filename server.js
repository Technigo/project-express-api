import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// Defines the port the app will run on (8080 is default)
const port = process.env.PORT || 8080
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
app.get('/books/book/:bookID', (request, response) => {
  const bookID = request.params.bookID
  const specificBook = booksData.find((specificBook) => specificBook.bookID === +bookID)
    
    response.json(specificBook)
})

// Endpoint/route that return a list of books by a specific author
app.get('/books/search', (request, response) => {
  const author = request.query.author
  const filteredAuthors = booksData.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase()))
    
    response.json(filteredAuthors)
})

// Endpoint/route that return the top ten books with a rating over 4
app.get('/books/top-ten', (request, response) => {
  const sortedOnRating = booksData.filter((item) => item.average_rating >= 4)
  let topTenBooks = sortedOnRating.slice(0,10)

    response.json(topTenBooks)
})

// Endpoint/route that return a single book based on the ID
app.get('/books/top-ten/:bookID', (request, response) => {
  const bookID = request.params.bookID
  const eachTopTenBook = booksData.find((eachTopTenBook) => eachTopTenBook.bookID === +bookID)
    
    response.json(eachTopTenBook)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
