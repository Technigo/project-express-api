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

//the basic endpoint
app.get('/', (request /* incoming */, response /* outgoing */) => {
  //response object -> used for building the response we send to the browser
  response.send('Good morning, Rebeka! Best of luck with this week\'s project')
})

//search by TITLE using query selectors
//localhost8080/books?title=Harry
app.get("/books", (request, response) => {

  const titleSearch = request.query.title

  if (titleSearch === undefined) {
    response.json(booksData)
  }
  else if (titleSearch !== undefined) {
    const titleLowerCase = titleSearch.toLowerCase()
    const titleArray = booksData.filter(book => book.title.toString().toLowerCase().includes(titleLowerCase))

    if (titleArray.length > 0) {
      response.json(titleArray)
    }
    else if (titleArray.length === 0) {
      response.json(`Ups, no keyword called "${titleLowerCase}" in a title.`)
    }
  }
})


//all books sorted asc by bookId
app.get("/books", (request, response) => {
  //WHY DOESN'T THIS WORK AS A PAGE?
  // response.send({ all_books: booksData.length })
  response.json(booksData)
})

//specific book (one object)
app.get("/id/:isbn13", (request, response) => {
  const bookId = req.params.isbn13
  console.log({ bookId })


  //find a book based on its isbn13
  const bookISBN13 = booksData.find(item => item.isbn13 === +bookId)

  response.json(bookISBN13)

  //if the book is not found error
  //sending back the data 9780060920081 (The lost continent)

  // if (!bookISBN13) {
  //want to return response with the entered isbn13 number
  //STH WRONG with THIS SYNTAX
  // response.status(404).json({ error: `No books with ISBN13 were found.` });
  // }
  // else {
  //   response.json(bookISBN13)
  // }

})

//sort books based on average rating (descending)
app.get("/books/rating", (request, response) => {

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



//empty endpoint (to be added in the future)
// app.get("/books/:thumbnail", (req, res)) {
//   //gets the data with all book cover images and 
//   response.send()
// }


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
