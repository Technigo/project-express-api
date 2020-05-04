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

//Filter on ID
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

// Filter on author and/or title
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


//Filter on language
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

//Books from highest to lowest rating
// http://localhost:8080/sort/ratings
app.get('/ratings', (req, res) => {
  const bookRating = booksData.sort((a, b) => -(parseFloat(a.average_rating) - parseFloat(b.average_rating)))
  res.json({
    text: "Average rating", bookRating
  })
})


// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
