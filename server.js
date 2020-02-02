import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'


//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here. Below: 
app.get('/', (req, res) => {
  res.send('Possible routes: /books, /language/:language, /rating, /page')
})

//SHOW WELCOME 
app.get('/Welcome', (req, res) => {
  res.send('WELCOME')
})


//SHOW A BOOK BASED ON ID
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = booksData.find((item) => item.bookID === +bookId)

  if (book) {
    res.json(book);
  } else {
    res.status(404).send(`No book found with id ${bookId}.`);
  }
})

// Filter based on title AND/OR author. http://localhost:8080/books?title=harry
app.get("/books", (req, res) => {
  //Query parameter
  const titleSearch = req.query.title
  const authorsSearch = req.query.authors
  let filteredBooks = booksData

  if (titleSearch) {
    filteredBooks = filteredBooks.filter(book => {
      const bookTitle = book.title.toString()
      return bookTitle.toLowerCase().includes(titleSearch.toLowerCase())
    })
  }
  if (authorsSearch) {
    filteredBooks = filteredBooks.filter(book => {
      const authorsName = book.authors.toString()
      return authorsName.toLowerCase().includes(authorsSearch.toLowerCase())
    })
    //if array is empty show error message
  } if (filteredBooks.length === 0) {
    res.status(404).send(`No books found`);
  } else {
    res.json(filteredBooks)
  }
})

//Filters on language_code.  http://localhost:8080/language/eng
app.get('/language/:language', (req, res) => {
  const language = req.params.language
  const bookLanguage = booksData.filter((item) => item.language_code === language)

  if (bookLanguage.length === 0) {
    res.status(404).send(`No books with the language: ${language} found.`);

  } else {
    res.json(bookLanguage)
  }
})

//Sort books from highest rating to lowest. http://localhost:8080/sort/rating
app.get('/rating', (req, res) => {
  const booksByRating = booksData.sort((a, b) => -(parseFloat(a.average_rating) - parseFloat(b.average_rating)))
  res.json({
    text: "Sorted by average rating",
    booksByRating
  })
})


//PAGINATION. Show 20 books per page. URL = http://localhost:8080/books1?page=1
const PER_PAGE = 20

app.get('/page', (req, res) => {
  //{page} = same as writing page = req.query.page
  const { page } = req.query
  //+page turn string to a integer
  const startIndex = PER_PAGE * +page
  const data = booksData.slice(startIndex, startIndex + PER_PAGE)
  const pageCount = Math.ceil(booksData.length / 20)

  //How do I get it to show the last page even it you write page 300?
  if (page >= pageCount) {
    res.status(404).send(`No page ${page} found, last page is ${pageCount}.`);
  } else {
    res.json({
      totalPages: Math.floor(booksData.length / PER_PAGE),
      currentPage: +page,
      data
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
