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
//localhost:8080/books/id/:isbn13

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

// --- top 20 books ----
//localhost:8080/books/rating/top_20
// . . .


//--- PAGES - 25 books/page ---
//localhost:8080/books/?page=1
app.get("/books/list", (request, response) => {

  const page = (request.query.page - 1) ?? 1 // ?? = nullish coalescing operator
  console.log(`Page = ${page}`)

  const pageSize = 20

  //calculate the start index
  const startIndex = page * pageSize

  //calculate and bound the end index
  const endIndex = startIndex + pageSize

  const booksPerPage = booksData.slice(startIndex, endIndex)
  console.log(`Books per page: ${booksPerPage}`)

  const returnObject = { numOfBooks: booksPerPage.length, booksPerPage }

  response.json(returnObject)
})


//empty endpoint (to be added in the future)
// app.get("/books/:thumbnail", (req, res)) {
//   //gets the data with all book cover images and 
//   response.send()
// }


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
