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


// {
//   "bookID": 1,
//     "title": "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
//       "authors": "J.K. Rowling-Mary GrandPré",
//         "average_rating": 4.56,
//           "isbn": 439785960,
//             "isbn13": 9780439785969,
//               "language_code": "eng",
//                 "num_pages": 652,
//                   "ratings_count": 1944099,
//                     "text_reviews_count": 26249
// },

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here. Below: 
app.get('/', (req, res) => {
  res.send('Hello world - project express api')
})

//SHOW WELCOME 
app.get('/Welcome', (req, res) => {
  res.send('WELCOME')
})

//SHOW ALL DATA IN JSON
app.get('/books', (req, res) => {
  res.json(booksData)
})

//SHOW A BOOK BASED ON ID (WHY NOT WORKING WITH .FILTER?)
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find((item) => item.bookID === +bookId)

  if (book) {
    res.json(book);
  } else {
    res.status(404).send(`No book found with id ${bookId}.`);
  }
  console.log(bookId)
})

// Filter based on title AND/OR country 
app.get("/books", (req, res) => {
  //Query parameter
  const titleSearch = req.query.title
  const authorsSearch = req.query.authors

  let filteredBooks = booksData

  if (titleSearch) {
    filteredBooks = filteredBooks.filter(book => {
      const bookTitle = book.title.toString()
      return bookTitle.toLowerCase().includes(titleSearch.toLowerCase())
    })
  }
  if (authorsSearch) {
    filteredBooks = filteredBooks.filter(book => {
      const authorsName = book.authors.toString()
      return authorsName.toLowerCase().includes(authorsSearch.toLowerCase())
    })
    res.json(filteredBooks)
  } else {
    res.status(404).send(`No book found with title: ${titleSearch}.`);
  }
  console.log(filteredBooks)
})

//Filters on language_code.  http://localhost:8080/language/eng
app.get('/language/:language', (req, res) => {
  const language = req.params.language
  const bookLanguage = booksData.filter((item) => item.language_code === language)

  res.json(bookLanguage)
})

//PAGINATION. URL = http://localhost:8080/books1?page=1
const PER_PAGE = 10

app.get('/books1', (req, res) => {
  const { page } = req.query
  const startIndex = PER_PAGE * +page
  const data = booksData.slice(startIndex, startIndex + PER_PAGE)

  res.json({
    totalPages: Math.floor(booksData.length / PER_PAGE),
    currentPage: +page,
    data
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
