import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
console.log(booksData.length)
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

// Start defining your routes here

// request is incomming (check), response is outgoing (change)
app.get('/', (req, res) => {
  res.send('Hello world')
})




app.get('/books', (req, res) => {
  const { title, author, language, from, to } = req.query

  const filterBooks = (array, filter) => {
    return array.toString().toLowerCase().includes(filter)
  }

  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter(book => filterBooks(book.authors, author))
  }
  if (title) {
    filteredBooks = filteredBooks.filter(book => filterBooks(book.title, title))
  }
  if (language) {
    filteredBooks = filteredBooks.filter(book => filterBooks(book.language_code, language))
  }
  if (from && to) {
    filteredBooks = filteredBooks.slice(from, to)
  }

  console.log(filteredBooks.length)

  if (filteredBooks.length > 0) res.json(filteredBooks)
  else res.status(404).json({ message: 'No book found' })
})


// use .find 
// use .filter to 
// use includes to search
// use .slice to only return 20

app.get('/author/:name', (req, res) => {
  const name = req.params.name
  const booksFromAuthor = booksData.filter(book => book.authors.toLowerCase().includes(name))

  if (booksFromAuthor.length > 0) {
    res.json(booksFromAuthor)
  }
  else {
    res.status(404).json({ message: 'Book title not found' })
  }

  // res.json(booksFromAuthor)
})

//path parameter 
app.get('/books/:id', (req, res) => {
  // const id = req.params.id
  const { id } = req.params

  const bookFromId = booksData.find(book => book.bookID === +id)

  // const bookWithId = booksData.filter(book => book.bookID === +id)
  res.json(bookFromId)
})



// app.get('/titles', (req, res) => {
//   const { title } = req.query
//   const bookTitle = booksData.filter((item) =>
//     item.title.toString().toLowerCase().includes(title))   
//     if (bookTitle) {
//       res.json(bookTitle)
//     } else {
//     res.status(404).json({ message: 'Book title not found' })
//   }
// })




//query parameter

// app.post put patch delete ???

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
