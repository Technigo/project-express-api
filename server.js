import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.send("Welcome to Annika's books API")
})

app.get('/books', (request, response) => {

  // should all be delcared here, or just on top of their conditional to make the code more efficient?
  const language = request.query.language
  const title = request.query.title
  const author = request.query.author
  const toprated = request.query.toprated
  const shortest = request.query.shortest

  if (language) {
    const filteredBooksOnLanguage = booksData.filter(item => item.language_code === language)
    if (filteredBooksOnLanguage.length > 0) {
      return response.json(filteredBooksOnLanguage)
    } else if (filteredBooksOnLanguage.length === 0) {
      return response.send("What is that language?")
    }
  }
  if (title) {
    const filteredBooksOnTitle = booksData.filter(item => item.title.toString().toLowerCase().replace(/[^a-zA-Z0-9]/g, " ").split(" ").includes(title.toLowerCase())) // my first regex!! 
    if (filteredBooksOnTitle.length > 0) {
      return response.json(filteredBooksOnTitle)
    } else if (filteredBooksOnTitle.length === 0) {
      return response.send("No such title")
    }
  }
  if (author) {
    const filteredBooksOnAuthor = booksData.filter(item => item.authors.toLowerCase().replace("-", " ").split(" ").includes(author.toLowerCase()))
    if (filteredBooksOnAuthor.length > 0) {
      return response.json(filteredBooksOnAuthor)
    } else if (filteredBooksOnAuthor.length === 0) {
      return response.send("No such author")
    }
  }
  if (toprated) {
    if (+toprated > booksData.length) {
      return response.send("That is just too many books")
    } else {
      const sortedBooksOnRating = booksData.sort(function (a, b) { return b.average_rating - a.average_rating })
      const topratedBooks = sortedBooksOnRating.slice(0, toprated)
      return response.json(topratedBooks)
    }
  }
  if (shortest) {
    const minPages = 20 // assuming pages less than 20 is an incorrect value
    const filteredBooksOnPages = booksData.filter(item => item.num_pages >= minPages)
    if (+shortest < minPages) {
      return response.send("You are dreaming..")
    } else {
      const sortedBooksOnPages = filteredBooksOnPages.sort(function (a, b) { return a.num_pages - b.num_pages })
      const shortestBooks = sortedBooksOnPages.slice(0, shortest)
      return response.json(shortestBooks)
    }
  }
  else {
    return response.json(booksData)
  }
})

app.get('/books/:id', (request, response) => {
  const id = request.params.id
  const book = booksData.find(item => item.bookID === +id)
  if (book) {
    return response.json(book)
  } else {
    return response.send("No such book")
  }
})

app.get('/books/:id/title', (request, response) => {

  const id = request.params.id
  const book = booksData.find(item => item.bookID === +id)

  if (book) {
    return response.json(book.title)
  } else {
    return response.send("No such book")
  }
})

app.get('/books/:id/authors', (request, response) => {

  const id = request.params.id
  const book = booksData.find(item => item.bookID === +id)

  if (book) {
    return response.json(book.authors.split("-"))
  } else {
    return response.send("No such book")
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})