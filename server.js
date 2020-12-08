import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'
//console.log(booksData[0].authors)

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//https://www.npmjs.com/package/express-list-endpoints
//documentation purpose of your api 
const listEndpoints = require('express-list-endpoints')

// Start defining your routes here
app.get('/', (req, res) => {
  //sätta en specifik timeout? 
  if(!res) {
    res
    .status(404)
    .send({ error: 'Sorry, a problem occured, try again later' })
  } 
  else res.send(listEndpoints(app))
})
console.log(listEndpoints(app))


// Route of books array, pagination as default
app.get('/books', (req, res) => {
  const { sort, author, title } = req.query
  let booksList = booksData

  //by rating dsc, asc
  if(sort === "rating_dsc") {
    booksList = booksList.sort((a, b) => (b.average_rating - a.average_rating))
  } else if (sort === "rating_asc") {
    booksList = booksList.sort((a, b) => (a.average_rating - b.average_rating))
  }
  
  //by author
  if (author) {
    booksList = booksList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLocaleLowerCase()))
  } 
  
  //by title
  if (title) {
    booksList = booksList.filter((item) => item.title.toString().toLowerCase().includes(title.toLocaleLowerCase()))
  }

  //PAGINATION limit of 20 per page
  const page = req.query.page ?? 0 //default 0
  const pageSize = req.query.pageSize ?? 20 //default 20
  const startIndex = page * pageSize 
  const endIndex = startIndex + (+pageSize)

  console.log(startIndex + '--' + endIndex)
  const booksListPage = booksList.slice(startIndex, endIndex)
  const returnObject = { 
    pageSize: pageSize, //hur ändrar jag detta till t ex 7 om jag filtrerar på author "j.k"?
    page: +page, //hur gör jag så att det är sida noll men visas som sida 1 på ett logiskt sätt och om jag skriver page=1 visas samma sida?
    maxPage: parseInt(booksList.length / pageSize),
    numberOfBooks: booksListPage.length,
    results: booksListPage 
  }

  if (booksListPage.length === 0) {
    res
    .status(404)
    .send({ error: 'Sorry, no books where found, please try a different query' })
  } 
  res.json(returnObject)
})

//array of authors
app.get("/books/authors", (req, res) => {
  const authorsArray = booksData.map(item => {
    return {...new Set(item.authors)}
  })
  res.send({authors: authorsArray.length, results: authorsArray})
})
  // const authorsArray = booksData.map(item => item.authors)
  // const uniqueAuthorsArray = authorsArray.reduce((unique, item) => {
  //   return unique.includes(item) ? unique : [...unique, item]
  // })
  //res.send({authors: uniqueAuthorsArray.length, results: uniqueAuthorsArray})


//Search by bookID
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookId = booksData.find(item => item.bookID === +id);

  if (!bookId) {
    res
      .status(404)
      .send({ error: `No book with id: "${id}" found` });
  } else res.json(bookId);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})