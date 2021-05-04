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

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to by Books API /Ann-Sofi Jönsson ')
})

// Detta är från föreläsning Localhost/books/idnr ex 2


app.get('/books', (req, res) => {
  console.log(req.query)
  const { author, title, language } = req.query

  if (!author && !title && !language) {
    res.status(404).send("Mandatory parameters are missing");
    return;
  }

  let bookList = booksData;

  if (author) {
    bookList = bookList.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  if (title) {
    bookList = bookList.filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  }

  if (language) {
    bookList = bookList.filter((book) => book.language_code.toLowerCase().includes(language.toLowerCase()))
  }

  if (bookList.length) {
    res.json(bookList)
  } else {
    res.status(404).send("Book not found");
  }
})

app.get('/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const books = booksData.find((book) => book.isbn === isbn)
  if (!books) {
    res.status(404).send("Book not found");
  }
  res.json(books)
})
// ta bort denna? ska vara find när vi bara ska ha ut en.
// Filter används när man vill ha ut en ny lista.
app.get('/id/:id', (req, res) => {
  const { id } = req.params;
  const book = booksData.filter((item) => item.bookID === parseInt(id, 10))
  res.json(book)
})

app.get('/author/:author', (req, res) => {
  const { author } = req.params;
  const books = booksData.filter((item) => item.authors === author)
  res.json(books)
})

// This endpoint filter on language
app.get('/lang/:lang', (req, res) => {
  const { lang } = req.params
  const filteredByLang = booksData.filter((item) => item.language_code === lang)
  res.json(filteredByLang)
})

// endpoint to get the top 5 books sorted on rating
app.get('/top5', (req, res) => {
  const books = booksData.sort((a, b) => b.average_rating - a.average_rating);
  res.json(books.slice(0, 5))
})

// app.get('/rating', (req, res) => {
//   res.json(booksData)
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
