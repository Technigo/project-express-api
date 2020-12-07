import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.send('👋 Welcome to my fist API with books and book reviews 📚🦉')
})

//Showing the first 100 books of all the books in the data
app.get('/books', (req, res) => {
  let selectedBooks = booksData.slice(0, 100)
  res.json(selectedBooks)
})

//Finding a single book by its id
app.get('/books/id/:id', (req, res) => {
  const id = req.params.id
  const bookByID = booksData.find(item => item.bookID === +id);

  if (!bookByID) {
    res.send('Error: Could not find any book with that ID. Try another ID!')
  }
  res.json(bookByID)
})

//Filtering books by author
app.get('/books/authors/:author', (req, res) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors.includes(author));

  if (booksByAuthor.length === 0) {
    res.send('Error: Could not find any books by that author. Try again!')
  }
  res.json(booksByAuthor);
})

// Finding the top 10 books based on rating
app.get('/books/toplist', (req, res) => {
  const highRating = booksData.filter(item => item.average_rating >= 4)
  const sortedToplist = [...highRating]
  sortedToplist.sort((a,b) => b.average_rating - a.average_rating)
  let toplist = sortedToplist.slice(0,10)

  res.json(toplist);
})

/* Filtering books by title -- this doesn't work, but author does... ?
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title
  const booksByTitle = booksData.filter(item => item.title.includes(title));
  
  if (booksByTitle.length === 0) {
    res.send('Error: Could not find any books with that title. Try again!')
  }
  res.json(booksByTitle);
})
*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
