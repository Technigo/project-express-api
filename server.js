import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import books from './data/books.json'

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
const port = process.env.PORT || 5000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Returning all the books (objects) from the array

app.get('/books', (req, res) => {
  res.json(books)
})

// Return an individual book, using :id as a placeholder for the bookID number
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const bookId = books.filter((item) => item.bookID === +id)
  res.json(bookId)
})

// Returning the books with a specific language code
app.get('/books/language/:language', (req, res) => {
  const language = req.params.language
  const booksLanguageCode = books.filter((item) => item.language_code === language)
  res.json(booksLanguageCode)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
