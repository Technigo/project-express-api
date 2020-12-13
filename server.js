import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books_10k.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('To see the collection type in /books')
})

// Return the whole collection with 10k books
app.get('/books', (reg, res) => {
  res.json(booksData)

})

// Return books of given year and query books with average rating over 4
app.get('/books/year/:year', (reg, res) => {
  const year = reg.params.year
  const topRated = reg.query.toprated
  let booksFromYear = booksData.filter((item) => item.original_publication_year === +year)

  if (topRated) {
    booksFromYear = booksFromYear.filter((item) => item.average_rating > 4)
  }

  if (booksFromYear.length === 0) {
    res.send('No books of that year exists in the collection')
  }
  res.json(booksFromYear)
})

// 
app.get('/books/authors/:authors', (reg, res) => {
  const authors = reg.params.authors
  let booksByAuthors = booksData.filter((item) => item.authors === authors)

  if (booksByAuthors.length === 0) {
    res.send('No author of that name exists in the collection')
  }
  res.json(booksByAuthors)
  //return only if the names are exactly the same.... 
})

// Return books with given id
app.get('/books/:id', (reg, res) => {
  const id = reg.params.id
  const booksById = booksData.find((item) => item.book_id === +id)

  if (!booksById) {
    res.send('No book of that id exists in the collection')
  }
  res.json(booksById)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
