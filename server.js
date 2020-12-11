import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books'

const port = process.env.PORT || 8083
const app = express()

// Added middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (request, response) => { // root endpoint
  response.send("Welcome to Annika's books API")
})

app.get('/books', (request, response) => {

  const language = request.query.language
  const title = request.query.title
  const author = request.query.author
  const toprated = request.query.toprated
  const shortest = request.query.shortest

  if (author && language) {
    const filteredBooksOnAuthorAndLanguage = booksData.filter(item => {
      return (
        item.authors.toLowerCase().split("-").includes(author.toLowerCase()) ||
        item.authors.toLowerCase().replace("-", " ").split(" ").includes(author.toLowerCase()) && item.language_code === language
      )
    })
    if (filteredBooksOnAuthorAndLanguage.length > 0) {
      return response.json(filteredBooksOnAuthorAndLanguage.slice(0, 20))
    } else {
      return response.status(404).json({ error: "No such combination" })
    }
  }

  if (language) {
    const filteredBooksOnLanguage = booksData.filter(item => item.language_code === language)
    if (filteredBooksOnLanguage.length > 0) {
      return response.json(filteredBooksOnLanguage.slice(0, 20))
    } else if (filteredBooksOnLanguage.length === 0) {
      return response.status(404).json({ error: "What is that language?" })
    }
  }

  if (title) {
    const filteredBooksOnTitle = booksData.filter(item => {
      return (
        item.title.toString().toLowerCase().replace(/[^a-zA-Z0-9-']/g, " ").split(" ").includes(title.toLowerCase()) || // matches against one word in the title
        item.title.toString().toLowerCase().split().includes(title.toLowerCase())) // matches against full title
    })

    // Not working, trying regex to have an exact match of the search word/words - this would be the best solution I think:
    // item.title.toString().toLowerCase().replace(/[^a-zA-Z0-9-']/g, " ").split(" ").match(`/^${title.toLowerCase()}$/`)
    // item.title.toString().toLowerCase().replace(/[^a-zA-Z0-9-']/g, " ").match(`/^\s${title.toLowerCase()}\s$/`))

    if (filteredBooksOnTitle.length > 0) {
      return response.json(filteredBooksOnTitle.slice(0, 20))
    } else if (filteredBooksOnTitle.length === 0) {
      return response.status(404).json({ error: "No such title" })
    }
  }

  if (author) {
    const filteredBooksOnAuthor = booksData.filter(item => {
      return (
        item.authors.toLowerCase().replace("-", " ").split(" ").includes(author.toLowerCase())) || // matches against one name in the author name
        item.authors.toLowerCase().split("-").includes(author.toLowerCase()) // matches against full author name
    })
    if (filteredBooksOnAuthor.length > 0) {
      return response.json(filteredBooksOnAuthor.slice(0, 20))
    } else if (filteredBooksOnAuthor.length === 0) {
      return response.status(404).json({ error: "No such author" })
    }
  }

  if (toprated) {
    if (+toprated > booksData.length) {
      return response.status(404).json({ error: "That is just too many books" })
    } else {
      const sortedBooksOnRating = booksData.sort(function (a, b) { return b.average_rating - a.average_rating })
      const topratedBooks = sortedBooksOnRating.slice(0, toprated)
      return response.json(topratedBooks)
    }
  }

  if (shortest) {
    const minPages = 20 // assuming pages less than 20 is an incorrect value
    const filteredBooksOnPages = booksData.filter(item => item.num_pages >= minPages)
    if (+shortest > filteredBooksOnPages.length) {
      return response.status(404).json({ error: "That is just too many books" })
    } else {
      const sortedBooksOnPages = filteredBooksOnPages.sort(function (a, b) { return a.num_pages - b.num_pages })
      const shortestBooks = sortedBooksOnPages.slice(0, shortest)
      return response.json(shortestBooks)
    }
  }

  else {
    return response.json(booksData.slice(0, 20))
  }
})

app.get('/books/:id', (request, response) => {
  const id = request.params.id
  const book = booksData.find(item => item.bookID === +id)
  if (book) {
    return response.json(book)
  } else {
    return response.status(404).json({ error: "No such book" })
  }
})

app.get('/books/:id/title', (request, response) => {

  const id = request.params.id
  const book = booksData.find(item => item.bookID === +id)

  if (book) {
    return response.json(book.title)
  } else {
    return response.status(404).json({ error: "No such book" })
  }
})

app.get('/books/:id/authors', (request, response) => {

  const id = request.params.id
  const book = booksData.find(item => item.bookID === +id)

  if (book) {
    return response.json(book.authors.split("-"))
  } else {
    return response.status(404).json({ error: "No such book" })
  }
})

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})







