import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import books from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8083
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})


// Endpoint that shows all books:
app.get('/books', (req, res) => {
  res.json(books)
})


// Endpoint that shows all authors in alphabetic order (for ex: /books/authors/authors)
app.get("/books/authors/:authors/", (req, res) => {
  const listAuthors = books.map((item) => item.authors).sort();
  res.json(listAuthors);
});


// Endpoint that shows books with specific rating (for ex: /books/rating/4.56)
app.get('/books/rating/:rating', (req, res) => {
  const rating = req.params.rating
  const avarageRating = books.filter((item) => item.average_rating === +rating)
  res.json(avarageRating)
})


// Endpoint that shows book with specific id (for ex: /books/id/45)
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params

  const getBook = books.find((book) => book.bookID === +id)

  if (!getBook) {
    res.status(404).json('Not found')
  } else {
    res.json({ data: getBook })
  }
})


app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
