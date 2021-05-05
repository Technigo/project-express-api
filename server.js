import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// import listEndpoints from 'express-list-endpoints'
import booksData from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'

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
// app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to Andreas book site. To get full list use the endpoint /books')
  // res.send(listEndpoints(app))
})

// Get all data/books.
app.get('/books', (req, res) => {
  /* const { authors, title } = req.puery
  let books = booksData

  if (authors) {
    books = books.filter((item) => item.authors.toLowerCase().includes(authors.toLowerCase()))
  }
  if (title) {
  books = books.filter((item) => item.title.toString().toLowerCase().includes(title.toLowerCase()))
  } */
  res.json(booksData)
})

// Get a book based on its id.
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const bookid = booksData.find((book) => book.bookID === +id)

  if (!bookid) {
    res.status(404).send(`There is no book with id number ${id} in the data!`)
  }
  res.json(bookid)
})

//  Get a book based on the title.
// ERROR
app.get('books/titles/:title', (req, res) => {
  const { title } = req.params
  // eslint-disable-next-line max-len
  const bookTitle = booksData.filter((book) => book.title.toString().toLowerCase().includes(title.toString().toLowerCase()))
  
  res.json(bookTitle)
})

// Filter books based on authors
//  ERROR
app.get('/books/authors/:author', (req, res) => {
  const { authors } = req.params
  // eslint-disable-next-line max-len
  const bookAuthor = booksData.filter((book) => book.authors.toLowerCase().includes(authors.toLowerCase()))

  res.json({ data: bookAuthor })
})

// Filter books based on language
// exampel: http://localhost:8080/books/languages/en-US
app.get('/books/languages/:language', (req, res) => {
  const { language } = req.params
  const booksInLanguage = booksData.filter((book) => book.language_code === language)

  res.json(booksInLanguage)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})