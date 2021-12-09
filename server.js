import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import listEndpoints from 'express-list-endpoints'

import books from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  const hello = {
    Welcome: 'Hello! This be a Book API',
    Routes: [{
      "/books_________________________": 'Get books.',
      "/books?title='title name'______": 'Get books with matching titles.',
      "/books?authors='author name'___": 'Get books from specific author.',
      "/books/id/'number'_____________": 'Get books with matching id.',
      "/books/isbn/'number'___________": 'Get books by unique ISBN nr.',
      "/books/pages/'number'__________": 'Get books with certain amount of pages.',
      "/books/language/eng____________": 'Get books written in english.',
      "/books/language/en-US__________": 'Get books written in US-english.',
      "/books/endpoints_______________": 'Get API endpoints.'
    }]
    
  }
  res.send(hello)
})

// List endpoints
app.get ('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
}
)

// route for books API
app.get('/books', (req, res) => {
  const { title, author } = req.query
 
  let booksToSend = books

  if (title){
    booksToSend = booksToSend.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 )
    }
  if (author){
    booksToSend = booksToSend.filter(
      (item) => item.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1 )
    }

  res.json({
    response: booksToSend,
    success: true
  })
})

// Specific book from id //books/id/"nr"
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params

  const bookNR = books.find(item => item.bookID === +id)

  if (!bookNR) {
    res.status(404).send('No book found!')
  } else {
    res.json(bookNR)
  }
})

// Book by ISBN nr
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params

  const isbnNr = books.find(item => item.isbn === +isbn)

  if (!isbnNr) {  
    res.status(404).send('No book for that IBAN nr!')
  } else {
    res.json(isbnNr)
  }
})

// Books by number of pages
app.get('/books/pages/:pages', (req, res) => {
  const { pages } = req.params

  const pageNr = books.filter(item => item.num_pages === +pages)

  if (!pageNr) {
    res.status(404).send('No book with that amount of pages!')
  } else {
    res.json(pageNr)
  }
})

// Books by rating
/* app.get('/books/rating/:rating', (req, res) => {
  const { rating } = req.params

  const ratingNr = books.filter(item => item.average_rating === +rating)

  if (!ratingNr) {
    res.status(404).send('No book with that amount of pages!')
  } else {
    res.json(ratingNr)
  }
}) */

// books in english //books/eng
app.get('/books/language/:eng', (req, res) => {
  const eng = req.params.eng
  const engBooks = books.filter((item) => item.language_code === eng)
  res.json(engBooks)
})
// books in us-english //books/en-US
app.get('/books/language/:us-eng', (req, res) => {
  const us = req.params.eng
  const usBooks = books.filter((item) => item.language_code === eng)
  res.json(usBooks)
})


// Title not used atm
/* app.get('/books/title/:title', (req, res) => {
  const { title } = req.params

  const titleName = books.find(item => item.title === title)

  if (!titleName) {
    res.json(404).json({
      response: 'No title found!',
      success: false
    })
  } else {
    res.status(200).json({
      response: titleName,
      success: true
    })
  }
}) */



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
