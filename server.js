import express, { response } from 'express'
import cors from 'cors'

import booksData from './data/books.json'
//import listEndpoints from 'express-list-endpoints'

const allRoutes = require('express-list-endpoints');

//---------PAGINATION---------------------
const pagination = (data, pageNumber) => {
  const pageSize = 20
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const itemsOnPage = data.slice(startIndex, endIndex)

  const returnObject = {
    page_size: pageSize,
    page: pageNumber,
    num_of_pages: Math.ceil(data.length / pagesize),
    items_on_page: booksOnPage.length,
    results: itemsOnPage
  }
  return returnObject
}
//---------PAGINATION---------------------

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(allRoutes(app))
})

//
app.get('/books', (req, res) => {
  // const pageNumber = req.query.page
  // if (page) {
  //   return pagination(booksData, pageNumber)
  // }
  res.json(booksData)
})

// Endpoint for all the books
app.get('/books/search', (req, res) => {
  const { author, title } = req.query
  // V1
  // let filteredBooks = booksData

  // if (author) {
  //   filteredBooks = filteredBooks.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase()))
  // }
  // if (title) {
  //   filteredBooks = filteredBooks.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))
  // }
  // if (filteredBooks.length === 0) {
  //   res.status(404).json("Sorry we could not find the book you searched")
  // } else {
  //   res.json(filteredBooks)
  // }

  // V2
  if (author !== undefined || title !== undefined) {
    if (author && title) {
      const filteredAuthorsAndTitle = booksData.filter((item) => {
        return item.authors.toLowerCase().includes(author.toLowerCase()) && item.title.toLowerCase().includes(title.toLowerCase())
      })
      res.json(filteredAuthorsAndTitle)
    } else {
      if (author) {
        const filteredAuthors = booksData.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase()))
        if (filteredAuthors.length === 0) {
          res.status(404).json(`Sorry, we could not find any book by the author ${author}`)
        } else {
          res.json(filteredAuthors)
        }
      }

      if (title) {
        const filteredTitles = booksData.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))
        if (filteredTitles.length === 0) {
          res.status(404).json(`Sorry, we could not find a book with the title ${title}`)
        } else {
          res.json(filteredTitles)
        }
      }
    }

  } else {
    res.json(booksData)
  }
})

// Endpoint with the list of popular books and a query for top n books (?top=3 or ?top=35)
app.get('/books/popular', (req, res) => {
  const topNumber = req.query.top
  const sortedTopToBottom = booksData.sort((a, b) => b.average_rating - a.average_rating)
  if (topNumber) {
    const topSelected = sortedTopToBottom.splice(0, topNumber)
    res.json(topSelected)
  } else {
    res.json(sortedTopToBottom)
  }
})

app.get('/books/quick-reads', (req, res) => {
  const sortedQuickToBig = booksData.sort((a, b) => a.num_pages - b.num_pages)
  const topQuickTwenty = sortedQuickToBig.splice(0, 21)
  res.json(topQuickTwenty)
})

// Endpoint to search one book by its id
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const selectedBook = booksData.find((item) => item.bookID === +bookId)
  if (!selectedBook) {
    res.status(404).send(`Sorry, there is no book with id number ${bookId}`)
  } else {
    res.json(selectedBook)
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
