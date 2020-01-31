import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'


/* {
  "bookID": 1,
  "title": "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
  "authors": "J.K. Rowling-Mary GrandPré",
  "average_rating": 4.56,
  "isbn": 439785960,
  "isbn13": 9780439785969,
  "language_code": "eng",
  "num_pages": 652,
  "ratings_count": 1944099,
  "text_reviews_count": 26249
}, */


//   PORT=9000 npm start
const port = process.env.PORT || 5000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/book', (req, res) => {
  res.json(booksData)
})

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find((item) => item.bookID === +bookId)
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("No book found")
  }
})

app.get('/title', (req, res) => {
  const title = req.params.title
  console.log({ title })
  const bookTitle = booksData.filter((item) => item.title === title)

  res.json(bookTitle)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})