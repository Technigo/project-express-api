import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

console.log(`Book nr: ${booksData.length}`)


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// --- ALL THE ROUTES ---

// --- front page ---
app.get('/', (request /* incoming */, response /* outgoing */) => {

  response.send('Books API.')
})


// --- return ALL BOOKS & search by TITLE using QUERY SELECTORS ---
//localhost:8080/books?title=freakonomics

app.get("/books", (request, response) => {

  const titleSearch = request.query.title

  if (titleSearch === undefined) {
    response.json(booksData)
  }
  else if (titleSearch !== undefined) {
    const titleLowerCase = titleSearch.toLowerCase()

    //this could be written more clear ...? 
    const titleArray = booksData.filter(book => book.title.toString().toLowerCase().includes(titleLowerCase))

    if (titleArray.length > 0) {
      response.json(titleArray)
    }
    else if (titleArray.length === 0) {
      response.status(404).json(`Ups, no keyword called '${titleLowerCase}' in a title.`)
    }
  }
})


// --- getting SPECIFIC book based on ISBN13 ---
//localhost:8080/id/:isbn13

app.get("/id/:isbn13", (request, response) => {

  const bookId = request.params.isbn13

  //find a book based on its isbn13
  const bookISBN13 = booksData.find(item => item.isbn13 === +bookId)

  if (bookISBN13) {
    response.json(bookISBN13)
  }
  else {
    response.status(404).json(`No book with ISBN13 ${bookId} was found.`);
  }
})

// --- SORTED books based on AVERAGE RATING (descending) ---
//localhost:8080/rating

app.get("/rating", (request, response) => {

  const compare = (a, b) => {
    if (a.average_rating > b.average_rating) {
      return -1
    }
    if (a.average_rating < b.average_rating) {
      return 1
    }
    else {
      return 0
    }
  }

  //sorting the numbers 
  const sortedRatingArray = booksData.sort(compare)

  response.json(sortedRatingArray)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
