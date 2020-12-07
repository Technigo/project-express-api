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
app.get('/', (request, response) => {
  response.send('My very first backend project & book-related API!')
})

//Response to show top books - http://localhost:8080/book
app.get('/book', (request,response) => {
  const title = request.query.title
  const average_rating = request.query.average_rating
  const filteredAuthors = request.query.authors

  const filteredBooks = booksData

  if(title) {
    filteredBooks = filteredBooks.filter(book => {
      const bookTitle = book.title
      return bookTitle.includes(title)
    }
  )}

   //Show books by authors - http://localhost:8080/book/:author
   app.get('/book/:filteredAuthors', (request, response) => {
    const filteredAuthors = request.params.filteredAuthors
    const showBookAuthor = booksData.filter((book) => book.filteredAuthors === +filteredAuthors)
   
    if (!showBookAuthor) {
      response.send("No such book author known to our database. Try searching for someone else!")
    }
   
    response.json(showBookAuthor)
   })

  //Show books by rating - http://localhost:8080/book?average_rating=high
  if(average_rating) {
    if(average_rating === 'high') {
      filteredBooks.sort((x,y) => y.average_rating - x.average_rating)
    } else if (average_rating === 'low') {
      filteredBooks.sort((x,y) => x.average_rating - y.average_rating)
    }
  }
    response.json(filteredBooks)
})

//Show books by bookID - http://localhost:8080/book/5
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
