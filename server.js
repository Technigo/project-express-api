import express from 'express'
import cors from 'cors'
import booksData from './data/books.json'

console.log(booksData.length)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Bajs')
})

app.get('/books', (req, res) => {
  const { title, author } = req.query
  let allBooks = booksData

  // Example: Write
  // http://localhost:8080/books?title=hatchet to get a specific book or ....?author=douglas adams to get all the books from that author
  if (title) {
    allBooks = allBooks.filter((singleBook) => singleBook.title.toLocaleLowerCase() === title.toLowerCase())
  }

  if (author) {
    allBooks = allBooks.filter((singleAuthor) => singleAuthor.authors.toLowerCase() === author.toLowerCase())
  }

  if (allBooks.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        books: allBooks
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Sorry, we cant't find what you are looking for",
      body: {}
    })
  }
})

app.get('/language/:language', (req, res) => {
  const language = req.params.language
  const languageCode = booksData.filter((item) => item.language_code === language)
  // res.json(languageCode)
  if (languageCode.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        language: languageCode
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Sorry, we cant't find what you are looking for",
      body: {}
    })
  }
})

app.get('/rating/:rating', (req, res) => {
  const rating = req.params.rating
  const minimumRating = booksData.filter((item) => item.average_rating >= +rating) //will show a minimum rating of what you type in the route

  if (minimumRating.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        rating: minimumRating
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Sorry, we cant't find what you are looking for",
      body: {}
    })
  }
})

app.get('/pages/:pages', (req, res) => {
  const pages = req.params.pages
  const maxAmountOfPages = booksData.filter((items) => items.num_pages <= +pages)

  if (maxAmountOfPages.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        pages: maxAmountOfPages
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Sorry, we cant't find what you are looking for",
      body: {}
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
