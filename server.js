import express, { response } from 'express'
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


// Endpoints begins here. Request is incomming (check), Response is outgoing (change)

// Root
app.get('/', (req, res) => {
  res.send('<code>Paths<br>"/books"<br>"/books/:id<br>"/isbn/:isbn"<code>')
})


// Books
app.get('/books', (req, res) => {
  const { title, author, language, minpages = 0, maxpages, rating, sort, page, results = 20 } = req.query

  const filterBooks = (array, filter) => {
    return array.toString().toLowerCase().includes(filter)
  }

  let filteredBooks = booksData;

  //Filter
  if (author) {
    filteredBooks = filteredBooks.filter(book => filterBooks(book.authors, author))
  }
  if (title) {
    filteredBooks = filteredBooks.filter(book => filterBooks(book.title, title))
  }
  if (language) {
    filteredBooks = filteredBooks.filter(book => filterBooks(book.language_code, language))
  }
  if (maxpages) {
    filteredBooks = filteredBooks.filter(book => book.num_pages < +maxpages && book.num_pages > +minpages)
  }
  if (rating) {
    filteredBooks = filteredBooks.filter(book => Math.round(book.average_rating) === +rating)
  }

  //Sort
  //sorting on author and title was a lot more complicated that I assumed 
  if (sort) {
    if (sort === 'author') {
      filteredBooks = filteredBooks.sort((a, b) => {
        const authorA = a.authors.toLowerCase()
        const authorB = b.authors.toLowerCase()
        if (authorA < authorB) return -1;
        if (authorA > authorB) return 1;
        return 0;
      });
    } else if (sort === 'title') {
      filteredBooks = filteredBooks.sort((a, b) => {
        const titleA = a.title.toString().toLowerCase()
        const titleB = b.title.toString().toLowerCase()
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
    } else if (sort === 'pages') {
      filteredBooks = filteredBooks.sort((a, b) => b.num_pages - a.num_pages);
    } else if (sort === 'rating') {
      filteredBooks = filteredBooks.sort((a, b) => b.average_rating - a.average_rating);
    }
  }

  //Pagination
  if (page) {
    filteredBooks = filteredBooks.slice((page - 1) * results, results * page)
    // filteredBooks = filteredBooks.slice(page - 1 * results, page * results + results)
  }

  //Returning results 
  if (filteredBooks.length > 0) res.json(filteredBooks)
  else res.status(404).json({ message: 'No books found' })
})


//Path parameter 
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const bookFromId = booksData.find(book => book.bookID === +id)

  if (bookFromId) res.json(bookFromId)
  else res.status(404).json({ message: `Id ${id} not found` })
})

app.get('/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const bookFromIsbn = booksData.find(book => book.isbn.toString() === isbn.toUpperCase() || book.isbn13.toString() === isbn.toUpperCase())

  if (bookFromIsbn) res.json(bookFromIsbn)
  else res.status(404).json({ message: `ISBN ${isbn.toUpperCase()} not found` })
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
