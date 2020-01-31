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

// The entire json
app.get('/book', (req, res) => {
  res.json(booksData)
})

// Get one book from ID
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find((item) => item.bookID === +bookId)
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("No book found")
  }
})

// Get language filterd on language_code
app.get('/language/:language', (req, res) => {
  const language = req.params.language
  console.log({ language })
  const bookLanguage = booksData.filter((item) => item.language_code === language)

  res.json(bookLanguage)
})

// Code along, search title and author with query
app.get('/book', (req, res) => {
  const searchString = req.query.search;

  let filteredDetails = booksData;
  if (searchString) {
    filteredDetails = filteredDetails.filter(item => {
      const itemTitle = item.title.toString();
      const itemsAuthor = item.authors.toString();
      return itemTitle.includes(searchString) ||
        itemsAuthor.includes(searchString)
    })
  }
  res.json(filteredDetails)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})