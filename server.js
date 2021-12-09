import express, { response } from 'express'
import cors from 'cors'

import booksData from './data/books.json'
import listEndpoints from 'express-list-endpoints'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Route with endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//
app.get('/books', (req, res) => {
  const { page, size } = req.query
  let booksPagination = booksData
  console.log(booksData.length)
  if (page && size) {
    const startIndex = (page - 1) * size
    const endIndex = startIndex + +size
    booksPagination = booksPagination.slice(startIndex, endIndex)
    res.json({
      page_number: page,
      num_of_pages: Math.ceil(booksData.length / size),
      items_on_page: booksPagination.length,
      results: booksPagination,
      success: true,
    })
  } else {
    res.json({
      response: booksPagination,
      success: true
    })
  }
})

// Endpoint for all the books
app.get('/books/search', (req, res) => {
  const { author, title } = req.query

  if (author !== undefined || title !== undefined) {
    if (author && title) {
      const filteredAuthorsAndTitle = booksData.filter((item) => {
        return item.authors.toLowerCase().includes(author.toLowerCase()) && item.title.toLowerCase().includes(title.toLowerCase())
      })
      res.json({
        response: filteredAuthorsAndTitle,
        success: true
      })
    } else {
      if (author) {
        const filteredAuthors = booksData.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase()))
        if (filteredAuthors.length === 0) {
          res.json({
            reponse: `Sorry, we could not find any book by the author ${author}`,
            success: true
          })
        } else {
          res.json({
            response: filteredAuthors,
            success: true
          })
        }
      }

      if (title) {
        const filteredTitles = booksData.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))
        if (filteredTitles.length === 0) {
          res.json({
            response: `Sorry, we could not find a book with ${title} title`,
            success: true
          })
        } else {
          res.json({
            response: filteredTitles,
            success: true
          })
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
    res.json({
      response: topSelected,
      success: true,
    })
  } else {
    res.json({
      response: sortedTopToBottom,
      success: true
    })
  }
})

app.get('/books/quick-reads', (req, res) => {
  const sortedQuickToBig = booksData.sort((a, b) => a.num_pages - b.num_pages)
  const topQuickTwenty = sortedQuickToBig.splice(0, 21)
  res.json({
    response: topQuickTwenty,
    success: true
  })
})

// Endpoint to search one book by its id
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const selectedBook = booksData.find((item) => item.bookID === +bookId)
  if (!selectedBook) {
    res.status(404).json({
      response: `Sorry, there is no book with id number ${bookId}`,
      success: false
    })
  } else {
    res.status(200).json({
      response: selectedBook,
      status: true
    })
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
