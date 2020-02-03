import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
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
  // res.send('Hello planet Earth!')
  res.send("Try searches based on the routes: /books, /id/[a number], /author/[name of author], /titles/[name of title] or  query for any word in title or author: library?search=[type your search]")

})

// Example of JSON-structure 
// {
//   "bookID": 3,
//   "title": "Harry Potter and the Sorcerer's Stone (Harry Potter  #1)",
//   "authors": "J.K. Rowling-Mary GrandPré",
//   "average_rating": 4.47,
//   "isbn": 439554934,
//   "isbn13": 9780439554930,
//   "language_code": "eng",
//   "num_pages": 320,
//   "ratings_count": 5629932,
//   "text_reviews_count": 70390
// }

//Parameters-explanained
//Path variable or path parameter  = something specific; an individual/item or group
// Easiest way of creating a rest route called books (path variable) (localhost:8080/books)
// app.get('/books', (req, res) => {
//   res.json(booksData)
// })



// PAGE - to have the result on a page with x number of boooks.

const PER_PAGE = 10


// routte to GET books by page (http://localhost:8080/books?page=2)
app.get('/books', (req, res) => {
  const { page } = req.query
  const startIndex = PER_PAGE * +page
  console.log(startIndex)
  const data = booksData.slice(startIndex, startIndex + PER_PAGE)

  res.json({
    totalPages: Math.floor(booksData.length / PER_PAGE),
    currentPage: +page,
    data
  })
})

//creating a sorted rating (localhost:8080/books/sort/rating)
app.get('/books/sort/rating', (req, res) => {
  const booksByRating = booksData.sort((a, b) => -(parseFloat(a.average_rating) - parseFloat(b.average_rating)))
  //console.log(rating)
  res.json(booksByRating)
})


//creating a rest route for id (localhost:8080/books/5) https://sv.wikipedia.org/wiki/404_error
app.get('/books/id/:id', (req, res) => {
  const bookId = req.params.id
  const findThatBook = booksData.find((item) => item.bookID === +bookId)
  if (findThatBook) {
    res.json(findThatBook)
  } else {
    res.status(404).send('There was no book with that id')
  }
})

//creating a rest route for id (localhost:8080/titles/cc), https://sv.wikipedia.org/wiki/404_error
app.get('/titles/:titles', (req, res) => {
  const titles = req.params.titles
  const findThatBookTitle = booksData.find((book) => book.title === titles)
  if (findThatBookTitle) {
    res.json(findThatBookTitle)
  } else {
    res.status(404).send('There was no book with that title, try to search with /library?search=[your search] instead. ')
  }
})

//creating a rest route called author localhost:8080/author/Exact name of author
app.get('/author/:author', (req, res) => {
  const author = req.params.author
  const filterAuthors = booksData.filter((items) => items.authors === author)

  if (filterAuthors) {
    res.json(filterAuthors)
    // Can't get this status to work on a filter function
  } else {
    res.status(404).send('There was no book written by the author')
  }
})


//Search function for Title or Author
//localhost:8080/library/
app.get('/library', (req, res) => {
  //query parameter (localhost:8080/library?search=XXX)
  const searchString = req.query.search

  let filteredBooks = booksData

  if (searchString) {
    filteredBooks = filteredBooks.filter(item => {
      const itemTitle = item.title.toString()
      const itemAuthor = item.authors.toString()
      return itemTitle.includes(searchString) || itemAuthor.includes(searchString)
    })
  }
  res.json(filteredBooks)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
