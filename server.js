import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
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

// Start defining your routes here. Endpoint to get all netflix titles
app.get('/books', (request, response) => {
  const { author } = request.query
  if (author) {
    const booksList = booksData.filter(book => book.authors.includes(author))
    response.json(booksList)
  }
  res.json(booksData)
})

app.get('/books', (request, response) => {
  response.json(booksData)
})

//Endpoint to get one book
app.get('/books/:bookid', (request, response) => {
  const { bookid } = request.params
  const book = booksData.find(book => book.bookID === +bookid)
  if (!book) {
    response.status(404).send(`Sorry, book ${bookid} dosen't exist`)
  }
  response.json(book)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
