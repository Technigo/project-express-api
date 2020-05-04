import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

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
  res.json('Hello world')
})


// All books
app.get('/books', (req, res) => {
  const titleSearch = req.query.title
  const numPages = req.query.pages
  const sort = req.query.sort
  let allBooks = data

  // Filter on title
  if (titleSearch) {
    allBooks = allBooks.filter((item) => {
      const bookTitle = item.title.toString() // Not sure why .toString() is neccessary
      return bookTitle.toLowerCase().includes(titleSearch.toLowerCase())
    })
  }

  // Filter on number of pages
  if (numPages) {
    allBooks = allBooks.filter((item) =>
      Math.floor(item.num_pages / 100) * 100 === +numPages) // Round down to nearest 100
  }

  // Sorting
  if (sort) {
    if (sort === 'rating') { // Sort on best rating
      allBooks = allBooks.sort((a, b) => b.average_rating - a.average_rating);
    } else if (sort === 'pages') { // Sort on number of pages
      allBooks = allBooks.sort((a, b) => b.num_pages - a.num_pages);
    }
  }

  res.json(allBooks)
})

// Single book by id
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = data.filter((item) => item.bookID === +bookId)

  // Ensure that no empty objects are shown
  if (book.length !== 0) { // Tried (bookId) here but then it shows an empty object even though the id doesn't exist.
    res.json(book)
    // If book was not found
  } else {
    res.status(404).send(`No book found with id ${bookId}`)
  }
})

// Books by author
app.get('/authors/:author', (req, res) => {
  const author = req.params.author
  const showRating = req.query.rating
  let booksByAuthor = data.filter((item) => // Check if items.author contains the value of author
    item.authors.toLowerCase().includes(author)
  )

  // Filter on rating
  if (showRating) {
    booksByAuthor = booksByAuthor.filter((item) =>
      item.average_rating.toFixed() === showRating
    )
  }

  res.json(booksByAuthor)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
