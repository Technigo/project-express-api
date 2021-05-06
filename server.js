import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
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

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Endpoints: /books, /books?author=collins, /books?title=titanic, /books/1, /books/languages/en-US')
})

// Get all books and filter author and title.
// http://localhost:8080/books?author=collins
// http://localhost:8080/books?title=titanic
app.get("/books", (req, res) => {
  const { author, title } = req.query
  let books = booksData

  if (author) {
    books = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  if (title) {
    books = booksData.filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  } 

  if (books.length) {
    res.json(books)
  } else {
    res.status(404).json(`Sorry, there is no book that fits your requirment!`)
  }
})

// Get a book based on id.
// http://localhost:8080/books/1
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const bookid = booksData.find((book) => book.bookID === +id)

  if (!bookid) {
    res.status(404).send(`There is no book with id number ${id} in the data!`)
  }
  res.json(bookid)
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