import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import books from './data/books.json'

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
  res.send('Hello world')
})

const PER_PAGE = 10

app.get('/books', (req, res) => {
  const { page } = req.query
  const startIndex = PER_PAGE * +page
  let booksData = books

  const { lang, title, rating } = req.query

  if (rating) {
    if (rating === 'asc') {
      booksData.sort((a, b) => a.average_rating - b.average_rating)
    } else if (rating === 'desc') {
      booksData.sort((a, b) => b.average_rating - a.average_rating)
    }
  } else {
    booksData.sort(function (a, b) { return a.bookID - b.bookID })
  }

  if (lang) {
    booksData = booksData.filter(book => book.language_code === lang)
  }

  if (title) {
    booksData = booksData.filter(book => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  }
  const length = booksData.length
  booksData = booksData.slice(startIndex, startIndex + PER_PAGE)

  res.json({
    totalPages: Math.floor(length / PER_PAGE),
    currentPage: +page,
    booksData
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id

  const book = books.find((book) => book.bookID === +id)

  res.json(book)
})

app.get("/title/:title", (req, res) => {
  const title = req.params.title
  const titleLetter = books.filter(book => {
    let bookTitle = book.title.toString()
    return bookTitle.toLowerCase().charAt(0) === title.toLowerCase().charAt(0)
  })

  res.json(titleLetter)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})