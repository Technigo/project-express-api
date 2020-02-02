import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// console.log(booksData.lenght)

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
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// {
//   "bookID": 78,
//   "title": "Annals of the Former World",
//   "authors": "John McPhee",
//   "average_rating": 4.33,
//   "isbn": 374518734,
//   "isbn13": 9780374518738,
//   "language_code": "eng",
//   "num_pages": 720,
//   "ratings_count": 2966,
//   "text_reviews_count": 211
// },

app.get('/allBooks', (req, res) => {
  res.json(booksData)
})

// path variable/path parameter

// app.get('authors/:author', (req, res) => {
//   const authors = req.params.authors
//   const nameOfAuthor = booksData.filter((item) => item.authors === authors)
//   res.json(nameOfAuthor)
// })


// path variable/path parameter
// app.get('/book/:id', (req, res) => {
//   const bookId = req.params.id
//   const book = booksData.filter(item => item.bookID === +bookId)
//   res.json(book) §§
// })

// query parameter
app.get('/author', (req, res) => {
  const authorSearchString = req.query.author
  const titleSearchString = req.query.title
  const ratingSearchString = req.query.rating

  let filteredAuthors = booksData

  if (authorSearchString) {
    filteredAuthors = filteredAuthors.filter(item => {
      const itemAuthor = item.authors.toString()
      return itemAuthor.toLowerCase().includes(authorSearchString.toLowerCase())
    })
  }

  if (titleSearchString) {
    filteredAuthors = filteredAuthors.filter(item => {
      const itemTitle = item.title.toString()
      return itemTitle.toLowerCase().includes(titleSearchString.toLowerCase())
    })
  }

  if (ratingSearchString) {
    filteredAuthors = filteredAuthors.filter(item => {
      const itemRating = item.average_rating.toString()
      return itemRating.toLowerCase().includes(ratingSearchString.toLowerCase())
    })
  }

  res.json(filteredAuthors)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
