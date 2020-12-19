import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

//Error messages
const ERROR_MESSAGE_AUTHORS = {error: 'No authors found.'}
const ERROR_MESSAGE_BOOKS = {error: 'No books found.'}
const ERROR_MESSAGE_TITLES = {error: 'No titles found.'}

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//____________ ROUTES/ENDPOINTS ____________ //

//Start
app.get('/', (req, res) => {
  res.json('👋 Welcome to Emmas book and book reviews API! Use the /books endpoint to get started 📚🦉')
})

//Returning a collection of all the books in the data
// Also contains the possibility to query for books by author and title
app.get('/books', (req, res) => {

  const { author, title } = req.query

  if(author) {
    const booksByAuthor = booksData.filter(item => 
      item.authors.toLowerCase().includes(author.toLowerCase())
    ) 
  if (booksByAuthor.length === 0) {
    res.status(404).json(ERROR_MESSAGE_AUTHORS)
  } else {
    res.json(booksByAuthor)
  }
} else if (title) {
  const booksByTitle = booksData.filter(item => 
    item.title.toLowerCase().includes(title.toLowerCase())
  )
  if (booksByTitle.length === 0) {
    res.status(404).json(ERROR_MESSAGE_TITLES)
  } else {
    res.json(booksByTitle)
  }
} else {
  res.json(booksData)
}
})


//Finding a single book by its id with path parameter :id
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const bookByID = booksData.find(item => item.bookID === +id)

  if (!bookByID) {
    res.status(404).json(ERROR_MESSAGE_BOOKS)
  } else {
    res.json(bookByID)
  }
})

// Query for finding a book toplist 
//(books are sorted on rating, with a query parameter to return a choosen number of books)
app.get('/toplist', (req, res) => {
  const { top } = req.query
  const sortedToplist = [...booksData]
  sortedToplist.sort((a,b) => b.average_rating - a.average_rating)
  let bookToplist = sortedToplist.slice(0, top)

  res.json(bookToplist)
})

//Query for pagination - showing 50 books on each page
app.get('/result-page', (req, res) => {
  const { page } = req.query
  let selectedBooks = booksData.slice(0,50)


  if (page === '1') {
    selectedBooks = booksData.slice(0, 50)
  } else if (page === '2') {
    selectedBooks = booksData.slice(51, 100) 
  } else if (page === '3') {
    selectedBooks = booksData.slice(101, 150) 
  } else if (page === '4') {
    selectedBooks = booksData.slice(151, 200) 
  } else if (page === '5') {
    selectedBooks = booksData.slice(201, 250) 
  } else if (page === '6') {
    selectedBooks = booksData.slice(251, 300) 
  } else if (page === '7') {
    selectedBooks = booksData.slice(301, 350) 
  } else if (page === '8') {
    selectedBooks = booksData.slice(351, 400) 
  } else if (page === '9') {
    selectedBooks = booksData.slice(401, 450) 
  } else if (page === '10') {
    selectedBooks = booksData.slice(451, 500) 
  }

  if (page > 10) { 
    res.status(404).json(ERROR_MESSAGE_BOOKS)
  } else {
    res.json(selectedBooks)
  }
})

/* Suggestion for empty/dummy-endpoint that could be used in the future: books by category

app.get('/books/:category', (req, res) => {
  const { bookCategory } = req.params
  const booksByCategory = booksData.find(item => item.category === bookCategory)
  res.json(booksByCategory)
})
*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
