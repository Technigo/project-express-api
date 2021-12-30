import express from 'express'
import cors from 'cors'
import booksData from './data/books.json'


const port = process.env.PORT || 8080
const app = express()

// Middlewares added to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Defining routes
app.get('/', (req, res) => {
  res.send('Book Reviews')
})

// get a list of books from json file
app.get('/books', (req, res) => {
  res.json(booksData)
})

// get a list of books with specific title
app.get('books/title/:title'), (req, res) => {
  const { title } = req.params

  const bookTitle = booksData.find(book => book.title.toLowerCase() === title.toLowerCase ())

  if (!bookTitle) {
    res.status(404).json({
      response: 'No book found with that title',
      success: false
    })
  } else {
    res.status(200).json({
      response: bookTitle,
      success: true
    })
  }
}

// get a specific book based on id
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params

  const bookId = booksData.find(book => book.bookID === +id)

  if (!bookId) {
    res.status(404).json({
      response: 'No book found with that id',
      success: false
    })
  } else {
    res.status(200).json({
      response: bookId,
      success: true
    })
  }
})

// get a list of books with specific rating
app.get('/books/rating/:rating', (req, res) => {
  const { rating } = req.params

  const bookRating = booksData.filter(book => book.average_rating === +rating)

  if (books.length === 0) {
    res.status(404).send({
      response: 'No books found with that rating',
      success: false
    })
  } else {
    res.status(200).json({
      response: bookRating,
      success: true
    })
  }
})

// get a list of books with specific language
app.get('/books/language/:languageCode', (req, res) => {
  const { languageCode } = req.params

  const bookLanguage = booksData.filter(books => books.language_code.toLowerCase() === languageCode.toLowerCase()
  )
  if (!bookLanguage) {
    res.status(404).json({
      response: 'No book found with that language',
      success: false
    })
  } else {
    res.status(200).json({
      response: bookLanguage,
      success: true
    })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
