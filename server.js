import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

console.log(booksData.length)

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// First page
 app.get('/', (req, res) => {
   res.send('Hello')
 })

// All titles in the API
app.get('/books', (req, res) => { 
  const {title, author} = req.query 
  let bookList = booksData
  
  
  if (title) {
    bookList = bookList.filter((item) => item.title.toString().toLowerCase().includes(title.toLocaleLowerCase()))
  }

  if (author) {
    bookList = bookList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLocaleLowerCase()))
  }
// Error message for title & author
  if(bookList.length === 0)
  res.status(404)
  .send({ error: 'error no book' })

  res.json({numberOfBooks:bookList.length, result:bookList})
})

// Endpoint ID
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const showBook = booksData.find((item) => item.bookID === +id)

  // Error message for ID
  if(!showBook)
  res.status(404)
  .send({ error: 'Could not fint that book' })
res.json(showBook)



}),


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
