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
const port = process.env.PORT || 8000
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
  const { page } = req.query
  const startIndex = 20 * +page
  res.json(books.slice(startIndex, startIndex + 20))
})

//request.params is an object containing properties to the named route
// Return an individual book, using :id as a placeholder for the bookID number
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const bookId = books.filter((item) => item.bookID === +id) // + means turning string into a number
  res.json(bookId)
  if (bookId) {
    res.json(bookId)
  } else {
    res.status(404).json({ message: 'No books found with this id.' })
  }
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
