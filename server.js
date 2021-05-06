import express, { request } from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
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


app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint to get all books. 
app.get('/books', (req, res) => {
  const { author } = req.query
  // book.authors.includes(author))

  const booksList = booksData.filter(book => {
    return book.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1
  })

  res.json({ data: booksList})

  // if (author) {
  //   const booksList = booksData.filter(book => book.authors.includes(author))
  //   res.json(booksList)
  // }
  // res.json(booksData)
})

// app.get('/books', (req, res) => {
//   const { title } = req.query
//   if (title) {
//     const booksTitleList = booksData.filter(book => book.title.includes(title))
//     res.json(booksTitleList)
//   }
//   res.json(booksData)
// })

// Endpoint to get one book.
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if (book) {
    res.json({data: book})
  } else {
    res.status(404).json({ error: 'Book not found'})
  }
  // if (!book) {
  //   res.status(404).json(`no book with id number ${id}`)
  // }
  // res.json(book)
})

// app.get('/books/:title', (req, res) => {
//   const { title } = req.params
//   const book = booksData.find(book => book.title === title)
//   if (!book) {
//     res.status(404).json(`no book with id number ${title}`)
//   }
//   res.json(book)
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server is 🏃‍♀️ on http://localhost:${port}`)
})
