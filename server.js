import express from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'

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
const app = express()

// Add middlewares to enable cors and json body parsing
// app.use(cors())
// app.use(bodyParser.json())

// Endpoint to get all the books
app.get('/books', (req, res) => {
  const { author } = req.query

  if(author) {
    const authorList = booksData.filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))
    res.json(authorList)
  }
  res.json(booksData)
})

// Endpoint to get one book
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if(!book) {
    res.status(404).send(`No book with id number ${id}`)
  }
  res.json(book)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
