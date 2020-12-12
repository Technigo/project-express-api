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
// a variable that will allow us to create a server.
// listens to incoming changes on a port ( in this case port 8080), the port is open for communication.
// reason for 8080: similar to 80 which was default for http before https
// (look upp commonly reserved ports on google.)
// express is responsible for creating endpoints
const app = express()

// ERROR MESSAGES: 
const ERROR_MESSAGE_AUTHOR_NOT_FOUND = { error: 'No book by that author found' }
const ERROR_MESSAGE_BOOK_ISBN_NOT_FOUND = { error: 'No book with that ISBN-number found.' }
const ERROR_MESSAGE_BOOK_ID_NOT_FOUND = { error: 'No book with that ID found.' }
const ERROR_MESSAGE_LANGUAGE_NOT_FOUND = { error: 'No books with that language-code found' }

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const myEndpoints = require('express-list-endpoints')

// Start defining your routes here (endpoints)
// req is incoming(we don't change it), the res is outgoing(we do change it)
app.get('/', (req, res) => {
  //Before the send we can write what ever we want here.
  //For example:
  //-Database connections
  //-Complicated operations
  //-Data lookup
  //-Third party API-requests
  if (!res) {
    res.status(404).json({ error : 'Error. No data found'})
  }
  res.send(myEndpoints(app))
  // simple: send something back without checking the request:
  //res.send('Hello world')
})

// BOOKS-ENDPOINT(WITH PAGES QUERY-PARAM)
//Add paging using query-params below (lecture no. 2 last year)
//res.send or res.json??? What to use?
//What's the difference of writing res.send(something) and res.json(something)?
//--> https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
//Gets all the books from books.json:
//http://localhost:8080/books
app.get('/books', (req, res) => {
  //res.json(booksData)
  const { author, title } = req.query;
  let booksList = booksData;
  // QUERY-PARAMETERS:
  // -Page (minValue 0, default 0): number to indicate what page to return.
  // -PageSize (default: 20) : a number indicating how many results per page
  // usage: localhost:8080/?page=2
  const page = req.query.page ?? 0;
  //console.log(`page = ${page}`)
  // We can define pageSize like: http://localhost:8080/books/?page=49&pageSize=10
  const pageSize = req.query.pageSize ?? 20;//The query param is a string
  const totalNumberOfBooks = booksData.length;
  const firstPageIndex = 0;
  const startIndex = page * pageSize;
  const endIndex = startIndex + +pageSize; // converts pageSize (string) to a number
  //Creating pages using slice:
  const bookPage = booksData.slice(startIndex, endIndex);
  const returnObject = { 
    totalNumberOfBooks: totalNumberOfBooks,
    pageSize: pageSize,
    page: page,
    firstPageIndex: firstPageIndex,
    lastPageIndex: parseInt(booksData.length/pageSize), 
    results: bookPage 
  };

  // Se lecture https://technigo.wistia.com/medias/2o4ta7pwhd
  // @44 mins forward about filtering results. How would I do that?
  // Van's quich pseudo-example:

  // let results = allResults;
  // if (somequeryParameter) {
  // results = results.filter(...something else based on one/more of query parameter)
  //} else if (anotherqueryParameter) {
    // results = results.filter(...something else based on one/more of query parameter)
  //}

  if (!page || !pageSize) {
    res.json(booksData)
  }
  res.json(returnObject)
})

// LANGUAGE-ENDPOINT.
// According to Maks friday lecture: language should be query param??
// Gets books in a specified language (by language-code):
//http://localhost:8080/books/language/fre 
// language_codes: eng, fre, en-US, spa, en-GB, mul, ger
app.get('/books/language/:language', (req, res) => {
  //get the variable out of the url: the language-placeholder
  //(:language) becomes rec.params.language
  const language = req.params.language
  // could also write this { language } = rec.params , then you could include several variables in the parethesis
  const booksByLanguage = booksData.filter((book) => book.language_code === language)

  if (booksByLanguage.length > 0) {
    res.json(booksByLanguage)
  }
  res.status(404).json(ERROR_MESSAGE_LANGUAGE_NOT_FOUND)
})

//ID-ENDPOINT. Get a single book by id:
//books/id for example "id": 154, http://localhost:8080/books/id/154
app.get('/books/id/:id', (req, res) => {
  const id = req.params.id
  const singleBookId = booksData.find((book) => book.bookID === +id) // + turns string to number

  if (!singleBookId) {
    res.status(404).json(ERROR_MESSAGE_BOOK_ID_NOT_FOUND)
  }
  res.json(singleBookId)
})

//ISBN-ENDPOINT.
//Return single book by isbn/isbn13:
//path: http://localhost:8080/books/isbn/"isbn"
//OR: http://localhost:8080/books/isbn/"isbn13"
app.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn
  const singleBookIsbn = booksData.find((book) => (book.isbn === +isbn || book.isbn13 === +isbn))

  if (!singleBookIsbn) {
    res.status(404).json(ERROR_MESSAGE_BOOK_ISBN_NOT_FOUND)
  }
  res.json(singleBookIsbn)
})

//Get books with a specified average-rating:
//books/rating

//Gets all books with a high avg. rating (3,5-5):
//app.get('/books/rating/high-rated')

//Search for a specific book title

//BOOKS-BY-AUTHOR-ENDPOINT.
//Get all books by a specific author ("authors")
// maybe this should be a query param instead as I'm using includes-method?
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author

  if (author) {
    //const booksFilteredByAuthor = booksData.filter(book => book.authors.toLowerCase().replace('-', ' ').split(' ').includes(author || author.toLowerCase()))
    const booksFilteredByAuthor = booksData.filter(book => (book.authors.includes(author) || book.authors.toLowerCase().includes(author)))

    if (booksFilteredByAuthor.length > 0) {
      res.json(booksFilteredByAuthor)
    } else if (booksFilteredByAuthor.length === 0) {
      res.status(404).json(ERROR_MESSAGE_AUTHOR_NOT_FOUND)
    }
  }
})

// Dummy endpoints:

//Post request to add a book to the json

// Put request to update average rating on book


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
