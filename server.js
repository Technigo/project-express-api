/* eslint-disable no-unused-vars */
import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/books', (req, res) => {
  const { author, title, lang } = req.query
  let booksResult = booksData

  if (author) {
    booksResult = booksResult
      .filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  } 
  
  if (title) {
    booksResult = booksResult
      .filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))
  } 
  
  if (lang) {
    booksResult = booksResult.filter((book) => book.language_code === lang)
  }
  res.json(booksResult)
})

app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const findId = booksData.find((book) => book.bookID === +id)

  if (findId.length === 0) {
    res
      .status(404)
      .json(`There's no book with id number '${id}'`)
  } else {
    res.json(findId)
  }
})

app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const findIsbn = booksData.find((book) => book.isbn === +isbn)

  if (findIsbn.length === 0) {
    res
      .status(404)
      .json(`There's no book with ISBN-number '${isbn}'`)
  } else {
    res.json(findIsbn)
  }
})

app.get('/books/titles/:title', (req, res) => {
  const { title } = req.params
  const filteredTitle = booksData.filter(
    (book) => book.title.toString().toLowerCase().includes(title.toString().toLowerCase())
  )
  if (filteredTitle.length === 0) {
    res
      .status(404)
      .json(`Sorry, couldn't find a book with title '${title}'`)
  } else {
    res.json(filteredTitle)
  }
})

app.get('/books/languages/:lang', (req, res) => {
  const { lang } = req.params
  const filteredLang = booksData.filter(
    (book) => book.language_code.toLowerCase() === lang.toLowerCase()
  )
  const languages = [...new Set(booksData.map((book) => book.language_code))]
  const availableLanguages = languages.map((language) => `'${language}'`).join(', ')

  if (filteredLang.length === 0) {
    res
      .status(404)
      .json(`Couldn't find any books with language-code '${lang}'. Available languages are: ${availableLanguages}`)
  } else {
    res.json(filteredLang)
  }
})

app.get('/books/top10', (req, res) => {
  const top10 = booksData.sort((a, b) => b.average_rating - a.average_rating).slice(0, 10)
  res.json(top10)
})

app.get('/books/authors', (req, res) => {
  const authors = [...new Set(booksData.map((book) => book.authors))].sort()
  res.json(authors)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`)
})
