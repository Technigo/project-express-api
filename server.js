import express from 'express'
 //import bodyParser from 'body-parser'
 import cors from 'cors'


 import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// get all the books
app.get('/books', (req, res) => {
  res.json(booksData)
});


//get books by author /books/authors?author= ...
app.get('/books/authors', (req, res) => {
  const { author } = req.query
  const authorList = booksData.filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))

  if(authorList.length === 0) {
    res.status(404).send(`Sorry, there is no books by ${author}`)
  }
  res.json(authorList)
});


//get books by title /books/titles?title= ...                    
app.get('/books/titles', (req, res) => {
  const { title } = req.query
  const  booksTitles = booksData.filter(book => book.title.toString().toLowerCase().includes(title.toLowerCase()))

  if (booksTitles.length === 0) {
    res.status(404).send(`Sorry, there is no books with the title ${title}`)
  }
  res.json(booksTitles)
});


// get thin books /books/thin?pages= ...
app.get('/books/thin', (req, res) => {
  const { pages } = req.query
  const thinBooks = booksData.filter(book => book.num_pages <= 500)

  if(pages >= 501) {
    res.status(404).send(`Sorry, could not find a thin book with ${pages} pages`)
  } 

  if(thinBooks === 0) {
    res.status(404).send(`Sorry, could not find a book with ${pages} pages`)
  }
  res.json(thinBooks)
})


//else (booksByThickness <= 500 ? thinBook : thickBook) ?????



// get one book by id /books/1
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if(!book) {
    res.status(404).send(`No book with id number ${id}`)
  }
  res.json(book)
});



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})


