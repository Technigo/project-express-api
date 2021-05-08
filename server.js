import express from 'express'
//import bodyParser from 'body-parser'
import cors from 'cors'


 import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hallo world');
})

//Endpoint example: /books, /books/id/1, /books/book_pages_below_500/499, /books/book_pages_above_500/501
//query example:    books?author=Rowling, books?title=harry, books?language=eng,  


// get all the books and/or author/title/language with query parameters
app.get('/books', (req, res) => {
  const { author, title, language } = req.query

  let booksToSend = booksData

  if(author) {
    booksToSend = booksToSend
      .filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  if(title) {
    booksToSend = booksToSend
     .filter(book => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  }

  if(language) {
    booksToSend = booksToSend
    .filter((book) => book.language_code === language)
  }

  res.json({length: booksToSend.length, data: booksToSend})
});


//get thin books (below 500 pages)
app.get('/books/book_pages_below_500/:pages', (req, res) => {
  const  pages = req.params.thin_books
  const thinBooks = booksData.filter((book) => book.num_pages <= 500)

  if(thinBooks) {
    res.json({ length: thinBooks.length, data: thinBooks }) 
  } else {
    res.status(404).json(`Sorry, there is no thin books with ${pages} pages`)
  }
}) 


//get thick books (above 500 pages)
app.get('/books/book_pages_above_500/:pages', (req, res) => {
  const  pages = req.params.thin_books
  const thickBooks = booksData.filter((book) => book.num_pages >= 501)

  if(thickBooks) {
    res.json({ length: thickBooks.length, data: thickBooks }) 
  } else {
    res.status(404).json(`Sorry, there is no thick books with ${pages} pages`)
  }
}) 


// get one book by id  
app.get('/books/id/:id', (req, res) => {
  const  id = req.params.id
  const book = booksData.find((book) => book.bookID === +id)

  if(book) {
    res.json({ data: book })
  } else {
    res.status(404).json(`No book with id number ${id}`)
  } 
});


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})


