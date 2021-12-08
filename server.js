import express from 'express'
import cors from 'cors'

import booksData from './data/books.json' 

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

//The array of data, to be used in differend endpoints
const reviews = [
  {"bookID": 1,
  "title": "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
  "authors": "J.K. Rowling-Mary GrandPré",
  "average_rating": 4.56,
  "isbn": 439785960,
  "isbn13": 9780439785969,
  "language_code": "eng",
  "num_pages": 652,
  "ratings_count": 1944099,
  "text_reviews_count": 26249
  },
]

// Start defining your routes here. 
// The app.get method takes two arguments - the path and a call back function, which can be used by the frontend.
app.get('/', (req, res) => {
  res.send('Hello world')
})

// A list of all books with all data (from json file)
app.get('/books', (req, res) => {
  res.json(booksData)
})

// A specific book, using params
app.get('/books/:id', (req, res) => {
  const { id } = req.params

  const book = booksData.find(item => item.bookID === +id)

  if (!book) {
    res.status(404).send('No book review found with this ID')
  } else {
    res.json(book)
  }

})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
