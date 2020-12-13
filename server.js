import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080
// A variable that will allow us to create a server.
// Listens to incoming changes on a port ( in this case port 8080), 
// the port is open for communication.
// Reason for 8080: similar to 80 which was default for http before https.

// express is responsible for creating endpoints
const app = express()

// ERROR MESSAGES: 
const ERROR_MESSAGE_AUTHOR_NOT_FOUND = { error: 'No book by that author found' }
const ERROR_MESSAGE_BOOK_ISBN_NOT_FOUND = { error: 'No book with that ISBN-number found.' }
const ERROR_MESSAGE_BOOK_ID_NOT_FOUND = { error: 'No book with that ID found.' }
const ERROR_MESSAGE_LANGUAGE_NOT_FOUND = { error: 'No books with that language-code found' }
const ERROR_MESSAGE_RATING_NOT_FOUND = { error: 'No books with that rating found' }
const ERROR_MESSAGE_DATA_NOT_FOUND = { error: 'No data was found'}
// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const myEndpoints = require('express-list-endpoints')

// DEFINING ROUTES (endpoints):

// ROOT-ENDPOINT.
app.get('/', (req, res) => { // req is incoming(we don't change it), the res is outgoing(we do change it)
  // NOTE TO SELF: Before the send we can write what ever we want here.
  // For example:
  // -Database connections
  // -Complicated operations
  // -Data lookup
  // -Third party API-requests
  if (!res) {
    res.status(404).json(ERROR_MESSAGE_DATA_NOT_FOUND)
  }
  res.send(myEndpoints(app))
})

// BOOKS-ENDPOINT(WITH PAGES QUERY-PARAM)
//Q: What's the difference of writing res.send(something) and res.json(something)? ANSWER: https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
//Gets all the books from books.json:
//http://localhost:8080/books
app.get('/books', (req, res) => {
// The '/books' endpoint gets an error in the console (but still works):
//Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  const { author, title } = req.query;
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 20;//The query param is a string
  let booksList = booksData;

  //Query by author:
  if (author) {
    booksList = booksList.filter(book => (book.authors.includes(author) || book.authors.toLowerCase().includes(author)))
  }

  // Query by title:
  if (title) {
    booksList = booksList.filter(book => book.title.toString().includes(title) || book.title.toString().toLowerCase().includes(title))
  }

  // PAGINATION (Query py page and/or page-size):
  // -Page (minValue 0, default 0): number to indicate what page to return.
  // -PageSize (default: 20)
  const totalNumberOfBooks = booksList.length;
  const firstPageIndex = 0;
  const startIndex = page * pageSize;
  const endIndex = startIndex + +pageSize; // converts pageSize (string) to a number
  //Creating pages using slice:
  const bookPage = booksList.slice(startIndex, endIndex);
  const returnObject = { 
    totalNumberOfBooks: totalNumberOfBooks,
    pageSize: pageSize,
    page: page,
    firstPageIndex: firstPageIndex,
    lastPageIndex: parseInt(booksList.length/pageSize), 
    results: bookPage 
  };
  
  if (bookPage.length === 0) {
    res.status(404).json(ERROR_MESSAGE_DATA_NOT_FOUND)
  }
  res.json(returnObject)
  // NOTE TO SELF: Se lecture https://technigo.wistia.com/medias/2o4ta7pwhd @44 mins forward about filtering results.
})

// LANGUAGE-ENDPOINT. // According to Maks friday lecture: language should rather be query param??
// Get books in a specified language (by language-code):
// language_codes: eng, fre, en-US, spa, en-GB, mul, ger
app.get('/books/language/:language', (req, res) => {
// This language endpoint gets an error in the console (but still works):
//Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client...
  const language = req.params.language
  const booksByLanguage = booksData.filter((book) => book.language_code === language)

  if (booksByLanguage.length > 0) {
    res.send(booksByLanguage)
  }
  res.status(404).json(ERROR_MESSAGE_LANGUAGE_NOT_FOUND)
}) 

// ID-ENDPOINT. 
// Get a single book by id:
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
app.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn
  const singleBookIsbn = booksData.find((book) => (book.isbn === +isbn || book.isbn13 === +isbn))

  if (!singleBookIsbn) {
    res.status(404).json(ERROR_MESSAGE_BOOK_ISBN_NOT_FOUND)
  }
  res.json(singleBookIsbn)
})

// TOP-RATED-BOOKS-ENDPOINT.
// Get a list of the top 100 rated books:
// http://localhost:8080/books/ratings/top100
app.get('/books/ratings/:top100', (req, res) => {
  const sortedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating)
  const top100Array = sortedBooks.slice(0, 100);
  
  if (top100Array.length === 0) {
    res.status(404).json(ERROR_MESSAGE_RATING_NOT_FOUND)
  } 
  res.json(top100Array)
})

//BOOKS-BY-AUTHOR-ENDPOINT.
//Get all books by a specific author ("authors")
// I also made a query-param for author above.
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author

  if (author) {
    const booksFilteredByAuthor = booksData.filter(book => (book.authors.includes(author) || book.authors.toLowerCase().includes(author)))

    if (booksFilteredByAuthor.length > 0) {
      res.json(booksFilteredByAuthor)
    } else if (booksFilteredByAuthor.length === 0) {
      res.status(404).json(ERROR_MESSAGE_AUTHOR_NOT_FOUND)
    }
  }
})

// DUMMY-ENDPOINTS:
// POST-request to add a book to the json.
// PUT-request to update average rating on book.
// Query-param: Show top 10 or top 100 books in a specific language. 

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
