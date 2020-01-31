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
  res.send('Hello planet Earth!')
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
// app.get('/shows/:id', (req, res) => {
//   const showId = req.params.showId
//   const show = netflixData.filter((item) => item.show_id === showId) 
//Query parameter = a portion of a path (of a "thing")

//creating a rest route called books (path variable)
//(localhost:8080/books)
app.get('/books', (req, res) => {
  res.json(booksData)
})

//creating a rest route for id (localhost:8080/books/5)
app.get('/id/:id', (req, res) => {
  const bookId = req.params.id
  const singleBook = booksData.filter((item) => item.bookID === +bookId)
  res.json(singleBook)
})


//creating a rest route called rating (localhost:8080/ratings/4.47)
app.get('/ratings/:ratings', (req, res) => {
  const ratings = req.params.ratings
  const ratingsNumber = booksData.filter((item) => item.average_rating === +ratings)
  console.log(ratings)
  res.json(ratingsNumber)

})

//creating a rest route called author localhost:8080/author/Exact name of author
app.get('/author/:author', (req, res) => {
  const author = req.params.author
  const filterAuthors = booksData.filter((item) => item.authors === +author)
  console.log(filterAuthors)
  res.json(filterAuthors)
})


// //creating a rest route called author (localhost:8080/books/J.K. Rowling-Mary GrandPré)
// app.get('/books/:author', (req, res) => {
//   const author = req.params.author
//   const bookAuthor = booksData.filter((item) => item.authors === +author)
//   console.log(author)

//   res.json(bookAuthor)
// })

//localhost:8080/library/
app.get('/library', (req, res) => {
  //query parameter (localhost:8080/library?search=XXX)
  const searchString = req.query.search
  //const authorSearchstring = req.query.authors

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




// app.get('/author/:author', (req, res) => {
//   const author = req.params.author
//   const findAuthors = booksData.filter((item) => item.authors === author)
//   console.log(author)
//   res.json(findAuthors)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
