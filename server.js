import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//_______ ROUTES/ENDPOINTS _______//

//Start/First endpoint
app.get('/', (req, res) => {
  res.send('👋 Welcome to my fist API with books and book reviews 📚🦉')
})

//Returning a collection of all the books in the data
app.get('/books', (req, res) => {
  res.json(booksData)
})

//Finding a single book by its id with path parameter :id
app.get('/books/:id', (req, res) => {
  const { bookID } = req.params
  const bookByID = booksData.find(item => item.bookID === +bookID)

  if (!bookByID) {
    res.send('Error: Could not find any book with that ID. Try another ID!')
  }
  res.json(bookByID)
})

//____________ QUERY PARAMETERS ____________ //

//Query for books by author
app.get('/authors', (req, res) => {
  const { author }  = req.query
  const booksByAuthor = booksData.filter(item => item.authors.includes(author))

    res.json(booksByAuthor);
})

// Query for books by title
app.get('/title', (req, res) => {
  const { title } = req.query
  const booksByTitle = booksData.filter(item => item.title.includes(title))
  
  res.json(booksByTitle);
})

/* Finding the top 10 books based on rating
app.get('/toplist', (req, res) => {
  const { toplist } = req.query
  const highRating = booksData.filter(item => item.average_rating >= 4)
  const sortedToplist = [...highRating]
  sortedToplist.sort((a,b) => b.average_rating - a.average_rating)
  let bookToplist = sortedToplist.slice(0,10)

  res.json(bookToplist);
})
//Showing the first 100 books of all the books in the data
app.get('/books', (req, res) => {
  let selectedBooks = booksData.slice(0, 100)
  res.json(selectedBooks)
})

//Empty/dummy endpoints 

*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
