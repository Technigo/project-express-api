import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

//adding middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//error messages

const notFound = {
  "code": 404,
  "message": "Not Found",
  "description": "Sorry, this resource does not exist."
}

//start defining routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//endpoint to get all books
app.get('/books', (request, response) => {
  const bookTitle = request.query.title
  const author = request.query.author
  let books = booksData.sort((a, b) => a.bookID - b.bookID)

  if (author) {
    books= books.filter((book) => book.authors.toLowerCase().includes(author)) //checks by author
  }

  if (bookTitle) {
    books = books.filter((book) => typeof book.title === "string") //checks if book title is a string
    books= books.filter((book) => book.title.toLowerCase().includes(bookTitle)) //
  }

  if (books.length === 0) {
    res.status(404).json(notFound) //displays 404 message when no results
  }

  response.json(books)
})

//endpoint to get one book by id
app.get('/books/:id', (request, response) => {
  const id = +request.params.id
  const bookById = booksData.find((book) => book.bookID === id) //checks Id

  if (!bookById) {
    response.status(404).json(notFound) //displays 404 error message 
  }

  response.json(bookById)
})

//endpoint to get the top 25 highest rated books with above 1000 ratings
app.get("/top25", (request, res) => {
  let highestRatingBooks = booksData.sort((a, b) => b.average_rating - a.average_rating) //to sort by highest rating

  highestRatingBooks = highestRatingBooks.filter((book) => book.ratings_count >= 1000) //only results above 1000

  const top25 = highestRatingBooks.slice(0, 25) //takes first 25
  res.json(top25)
})


//start the server
app.listen(port, () => {
  //eslint-disable-next-line
 console.log(`Server 🚀 on http://localhost:${port}`)
})