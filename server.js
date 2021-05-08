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
const port = process.env.PORT || 3000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  return res.send('Hello world')
})

// Books
app.get('/api/book', (req, res) => {
  const { query } = req


  
  return res.json(booksData).status(200)
})

app.get('/api/book/:bookId', (req, res) => {
  const { bookId } = req.params
  const books = booksData.filter((item) => item.bookID.toString() === bookId)
  if (books.length === 1) {
    return res.send(books[0]).status(200)
  } else {
    return res.status(404).send({ error: `No book found for bookId: ${bookId}` })
  }
})

app.post('/api/book', (req, res) => {
  const newBook = req.body
  booksData.push(newBook)
  return res.json(newBook).status(201)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
 