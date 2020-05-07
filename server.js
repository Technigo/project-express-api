import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// PORT = 9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.send('Routes: /books, /language/:language, /rating, /page')
})

//Show all data
app.get('/books', (req, res) => {
  res.json(booksData)
})

//PAGINATION http://localhost:8080/page?page=0

app.get('/page', (req, res) => {
  const PER_PAGE = 20
  const page = req.query.page
  const startIndex = PER_PAGE * +page
  const data = booksData.slice(startIndex, startIndex + PER_PAGE)
  const pageCount = Math.ceil(booksData.length / 20)

  if (page >= pageCount) {
    res.status(404).send(`The page ${page} is not found, the last page is ${pageCount}.`);
  } else {
    res.json({
      totalPages: Math.floor(booksData.length / PER_PAGE),
      currentPage: +page,
      data
    })
  }
})

// FILTER ON ID
//http://localhost:8080/books/1
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find((item) => item.bookID === +bookId)

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Not found')
  }
})

// FILTER ON AUTHOR AND/OR TITLE
// http://localhost:8080/books?title=John
app.get('books/', (req, res) => {
  const searchAuthor = req.query.authors
  const searchTitle = req.query.title
  let filteredBooks = booksdata

  if (searchAuthor) {
    filteredBooks = filteredBooks.filter(item => {
      const authorsName = item.authors.toString()
      return authorsName.includes(searchAuthor)
    })
  }

  if (searchTitle) {
    filteredBooks = filteredBooks.filter(item => {
      const bookTitle = item.title.toString()
      return bookTitle.includes(searchTitle)
    })
  }

  //if empty array
  if (filteredBooks.length === 0) {
    res.status(404).send('Not found')
  } else {
    res.json(filteredBooks)
  }
})

//FILTER ON LANGUAGE
//http://localhost:8080/language/spa
//http://localhost:8080/language/eng
app.get('/language/:language', (req, res) => {
  const language = req.params.language
  const bookLanguage = booksData.filter((item) => item.language_code === language)

  if (bookLanguage.length === 0) {
    res.status(404).send(`Not found. Your entry: ${language} is not valid.`)
  } else {
    res.json(bookLanguage)
  }
})

// BOOKS SORTED FROM HIGHEST TO LOWEST RATING
// http://localhost:8080/rating
app.get('/rating', (req, res) => {
  const booksRating = booksData.sort((a, b) => ((b.average_rating) - (a.average_rating)))
  res.json(booksRating)
})

//PAGINATION / show 20 results per page


// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
