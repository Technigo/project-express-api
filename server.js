import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()
const ERROR_DATA_NOT_FOUND = { error: 'Data not found'}

app.use(cors())
app.use(bodyParser.json())

app.get('/books/page/:page', (req, res) => {
  const page = req.params
  res.json(showData)
})

//search for books by Id
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const filterById = booksData.filter((book) => book.bookID === +bookId)
  if (filterById.length === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(filterById) 
  }
})

//search for books by author
app.get('/books/authors/:author', (req, res) => {
  const { author } = req.params
  const filterByAuthor = booksData.filter((book) => {
    const lowercaseAuthors = book.authors.toLowerCase()
    return lowercaseAuthors.includes(author);
  })

  if (filterByAuthor.length === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(filterByAuthor)
  }
})

//search for books by title
app.get('/books/titles/:title', (req, res) => {
  const { title } = req.params
  const filterByTitle = booksData.filter((book) => {
    const titleString = String(book.title)
    const lowercaseTitle = titleString.toLowerCase()
    return lowercaseTitle.includes(title);
  })
  if (filterByTitle.length === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(filterByTitle)
  }
})

//search for books by language
//take the first two character of the query and compare to the first two letter in the language_code
app.get('/books/language/search', (req, res) => {
  const language = req.query.lang
  const splitLangInput = language.split('')
  const sliceLangInput = splitLangInput.slice(0, 2)
  
  const filterByLanguage = booksData.filter((book) => {
    const langString = String(book.language_code)
    const lowercaseLang = langString.toLowerCase()
    const splitLangData = lowercaseLang.split('')
    const sliceLangData = splitLangData.slice(0, 2)

    return sliceLangInput[0] === sliceLangData[0] && sliceLangInput[1]=== sliceLangData[1]
  })

  if (filterByLanguage.length === 0) {
      return res.status(404).json(ERROR_DATA_NOT_FOUND)
    } else {
      res.json(filterByLanguage)
    }
})

//sort books by average_rating
app.get('/books/rating/sort', (req, res) => {
  const { sortorder } = req.query
  const sortbyRating = booksData.sort(function(a,b) {
    if (sortorder === 'asc') {
      return +a.average_rating - +b.average_rating
    } else if ( sortorder === 'des') {
      return +b.average_rating - a.average_rating
    } 
  })

  if (sortbyRating.length === 0) {
    return res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(sortbyRating)
  }
})

//sort books by number of pages
app.get('/books/pages/sort', (req, res) => {
  const { sortorder } = req.query
  const sortbyPages = booksData.sort(function(a,b){
    if (sortorder === 'asc') {
      return +a.num_pages - +b.num_pages
    } else if ( sortorder === 'des') {
      return +b.num_pages - +a.num_pages
    }
  })

  if (sortbyPages.length === 0) {
    return res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(sortbyPages)
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
