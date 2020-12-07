import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'
console.log(`number of books: ${booksData.length}`)
console.log(`line 6: ${typeof booksData[0].title}`)

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


//https://www.npmjs.com/package/express-list-endpoints
//npm install express-list-endpoints (updated in package.json)
//documentation purpose of your api 
const listEndpoints = require('express-list-endpoints')


// Start defining your routes here
//this is where I add information I want to display if no path is defined...
//if there is nothing here - the page will just load until time out. 
//then frontend can display this with text and so on

//this might be where the documentation will be?
app.get('/', (req, res) => {
  //res.send('Hello world')
  //res.send(booksData)
  //HUR KAN JAG MODIFIERA FÖR ATT TESTA DETTA? Kommentera ut else 
  //sätta en specifik timeout? 
  if(!res) {
    res
    .status(404)
    .send({ error: 'Sorry, a problem occured, try again later' })
  } 
  else res.send(listEndpoints(app))
  console.log("still processing '/' endpoint")
})

//to get all books presented in json
//Pagination 
  // 1) How many things are we going to return per page?  
  // 2) How do we know which page to return? 
  // to main things we need to know to create of subset of the data we are returning.
app.get('/books', (req, res) => {
  const { page, author, title } = req.query  
  //console.log(`page: ${page}`)
  let booksList = booksData;
  //console.log(`books: ${booksList}`) 
  

  /*Search books by specific query*/
  //by author
  // if (author) {
  //   const filteredAuthorsList = booksList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLocaleLowerCase()))
  //   res.json(filteredAuthorsList)
  // } else {
  //   res.json(booksList)
  // }

  if (author) {
    const filteredAuthorsList = booksList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLocaleLowerCase()))
    res.json(filteredAuthorsList)
  } else {
    res.json(booksList)
  }
  

  //by title
  if (title) {
    const filteredTitlesList = booksList.filter((item) => item.title.toString().toLowerCase().includes(title.toLocaleLowerCase()))
    res.json(filteredTitlesList)
  } else {
    res.json(booksList)
  }

  const pageSize = 20   //calculate the start index, will be 0 (0 * 20)
  const startIndex = page * pageSize //calculate and bound the end index, will be 20 (0 + 20)
  const endIndex = startIndex + pageSize
  const booksListPage = booksList.slice(startIndex, endIndex)
  const returnObject = { books: booksListPage.length, booksListPage }

  if (booksListPage.length === 0) {
    res
    .status(404)
    .send({ error: 'Sorry, no books where found, please try a different query' })
  }

  //to see this on localhost type: http://localhost:8080/books/?page=3 
  //change page=3 to any number depending on page you want to view
  res.json(returnObject)

  //STARTED OFF WITH THIS
  // let booksList = booksData
  // res.json(booksList)
})






/*** to get one book presented in json based on book id ***/
app.get("/books/:id", (req, res) => {
  //console.log(`req.params without id: ${req.params}`) //returns a string therefor the + on line 85 to convert to a number
  //console.log(`req.params with id: ${req.params.id}`) //returns 1

  const id = req.params.id;
  console.log(`id type of: ${typeof id}`) //type of string

  const bookWithId = booksData.find(item => item.bookID === +id); //type of object +convert to an integer parseInt(id) will do the same
  console.log(`bookWithId type of: ${typeof bookWithId}`)

  if (!bookWithId) {
    res
      .status(404)
      .send({ error: `No book with id: "${id}" found` });
  }

  res.json(bookWithId);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
