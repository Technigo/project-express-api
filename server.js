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

//listing all books. Title is a possible param.
//to String is needed since item.title is an object.
app.get('/books', (req, res) => {
  const title = req.query.title

  if (title){
    let filteredBooksTitle = booksData.filter(item => item.title.toString().toLowerCase().includes(title.toLowerCase()))
    if (filteredBooksTitle.length > 0) {
      res.json(filteredBooksTitle)
    } else{
      res.status(404).json({ message: 'No such title found' })
    }
  } else {
    res.json(booksData)
  }
})

//listing books from a specific Author
app.get('/:author', (req, res) => {
  console.log(author)
  const author = req.params.author


  const booksFromAuthor = booksData.filter((item) => item.authors === author)

  res.json(booksFromAuthor)
  
})

//returning a single book filtered on id
// using find instead of filter since I only want one result
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const matchingId = booksData.find((item) => item.bookID === +id)

  if (matchingId) {
    res.json(matchingId)
  } else {
    res.status(404).json({ message: 'No such Id found' })
  }
  
})


/*app.get('/:rating', (req, res) => {
  const rating = req.params.rating
  const highRatingArray = booksData.filter((item) => item.average_rating > 4)
  console.log(ratingArray)
  //const highrating = ratingArray.sort((a,b) => a-b)
  res.json(ratingArray)
})*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
