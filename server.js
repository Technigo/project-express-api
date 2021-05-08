import express, { request, response } from 'express'
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
app.use(express.json())

// Start defining your routes here
app.get('/', (request, response) => {
  response.send('Hello from the other side')
})

app.get('/books', (request, response) => {
  const { author } = request.query
  if (author) {
    const bookList = booksData.filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))
    response.json(bookList)
  }
  response.json(booksData)
})

app.get('/books/:id', (request, response) => {
  const { id } = request.params
  const book = booksData.find( book => book.bookID === +id)
  if (!book) {
    response.status(404).send(`The book with id ${id} doesn't exist in this website`)
  }
  response.json(book)
  // request.params.id
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`WOOP 🚀 Server running on http://localhost:${port}`)
})
