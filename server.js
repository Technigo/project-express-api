import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// request is incoming an res is outgoing
app.get('/', (req, res) => {
  res.send('Hello world, Im here now!')
})

//returning all books. Anda query param to search on title.
//to String is needed since item.title is an object.
app.get('/books', (req, res) => {
  const { title, author } = req.query
  let filteredBooks = booksData

  if (title) {
    filteredBooks = booksData.filter(item => item.title.toString().toLowerCase().includes(title.toLowerCase())) 
  } 
  if (author) {
    filteredBooks = booksData.filter(item => item.authors.toString().toLowerCase().includes(author.toLowerCase()))
  }

  if (filteredBooks.length > 0) {
    res.json(filteredBooks)
  } else{
    res.status(404).json({ message: 'No such book found' })
  }
})


//returning a single book from searching id
// using find instead of filter since I only want one result
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find((item) => item.bookID === +id)

  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: 'No such book found' })
  }
})

  

/*app.get('/books/:rating', (req, res) => {
  const rating = req.params.rating
  const highRatingArray = booksData.filter((item) => item.average_rating > 4)
  console.log(hihgRatingArray)
  //const highrating = ratingArray.sort((a,b) => a-b)
  res.json(highRatingArray)
})*/

/*const sortedBooksOnRating = booksData.sort(function (a, b) { return b.average_rating - a.average_rating })*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
