import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 5000
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (request, response) => {
  response.send('My very first backend project & book-related API!')
})

//Response to show top books - http://localhost:5000/book
app.get('/book', (request,response) => {
  let filteredBooks = booksData
  const title = request.query.title
  const author = request.query.authors
  const average_rating = request.query.average_rating
  const num_pages = request.query.num_pages

  if(title) {
    filteredBooks = filteredBooks.filter((book) => book.title.includes(title))
  }
  if(author) {
    filteredBooks = filteredBooks.filter((book) => book.authors.toString().toLowerCase().includes(author.toLocaleLowerCase()))
  }


   //Show books by authors - http://localhost:5000/book/:filteredAuthors
   app.get('/book/:filteredAuthors', (request, response) => {
    const filteredAuthors = request.params.filteredAuthors
    const showBooksByAuthor = booksData.filter((book) => book.authors.includes(filteredAuthors))
   
    if (showBooksByAuthor.length===0) {
      response.send("No such book author known to our database. Try searching for someone else!")
    }
   
    response.json(showBooksByAuthor)
   })

  //Show books by rating - http://localhost:5000/book?average_rating=high
  //Show books by number of pages - http://localhost:5000/book?num_pages=lots
    if(average_rating === 'high') {
      filteredBooks = filteredBooks.sort((x,y) => (y.average_rating - x.average_rating))
    } else if (average_rating === 'low') {
      filteredBooks = filteredBooks.sort((x,y) => (x.average_rating - y.average_rating))
    } else if (num_pages === 'lots') {
      filteredBooks = filteredBooks.sort((x,y) => (y.num_pages - x.num_pages))
    } else if (num_pages === 'few') {
      filteredBooks = filteredBooks.sort((x,y) => (x.num_pages - y.num_pages))
  }
    response.json(filteredBooks)
})

//Show books by bookID - http://localhost:5000/book/5
app.get('/book/:bookID', (request, response) => {
 const bookID = request.params.bookID
 const showBookID = booksData.find((book) => book.bookID === +bookID)

 if (!showBookID) {
   response.send("Hmm, we can't find that book in our database. Try searching another ID!")
 }

 response.json(showBookID)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})