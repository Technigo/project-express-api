import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

console.log(`Book nr: ${booksData.length}`)


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
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

// --- ALL the routes ---

app.get('/', (request /* incoming */, res /* outgoing */) => {
  //response object -> used for building the response we send to the browser
  res.send('Good morning, Rebeka! Best of luck with this week\'s project')
})

//all the books
app.get("/books", (req, res) => {
  res.json(booksData)
})

//specific book (one object)
app.get("/id/:isbn13", (req, res) => {
  const bookId = req.params.isbn13
  console.log({ bookId })


  //find a book based on its isbn13
  const bookISBN13 = booksData.find(item => item.isbn13 === +bookId)

  res.json(bookISBN13)
  //if the book is not found error
  //sending back the data 9780060920081 (The lost continent)

  // if (!bookISBN13) {
  //want to return response with the entered isbn13 number
  //STH WRONG with THIS SYNTAX
  // response.status(404).json({ error: `No books with ISBN13 were found.` });
  // }
  // else {
  //   res.json(bookISBN13)
  // }

})

//filter books based on average rating
app.get("/books/rating", (req, res) => {

  //sorting the numbers 
  const ratingArray = booksData.sort(compare)
  console.log(`Rating array: ${ratingArray}`)

  function compare(a, b) {
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

  // const sortedArray = booksData.sort(compare)
  // console.log(`soret array; ${sortedArray}`)
  // res.json(sortedArray)
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
