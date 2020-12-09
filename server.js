import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
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
  res.send('Hello world')
})

//get all data
app.get('/books', (req, res) => {
  res.json(booksData)
})

//get a book bases on its id.
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find(book => book.bookID === +bookId)
  if (!book) {
    res.send('Error: Could not find any book with that Id!')
  }
  res.json(book)
})

//sort books based on author
app.get('/books/authors/:author', (req, res) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(book => book.authors === author)
  if (booksByAuthor.length === 0) {
    res.send('Error: Could not find any books by that author!')
  }
  res.json(booksByAuthor)
})

//get a book based on title
app.get('/books/titles/:title', (req, res) => {
  const book = req.params.title
  const bookTitle = booksData.filter(item => item.title === book)
  if (bookTitle.length === 0) {
    res.send('Error: Could not find any book with that title!')
  }
  res.json(bookTitle);
})

//sort books by rating 
app.get('/books/toplist/:nr', (req, res) => {
  const nrOfBooks = req.params.nr;
  const highRatedBooks = [...booksData];
  highRatedBooks.sort((a, b) => b.average_rating - a.average_rating)
  const topList = highRatedBooks.slice(0, nrOfBooks);
  res.json(topList)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
