import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'



const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.json({
    booklist: '/books',
    orderQuery: '/books?order= //options: highest, lowest, shortest, longest',
    keywordQuery: '/books?keyword= //Search keyword with underscores for spaces to find book/author',
    pageQuery: '/books?page= //Defaults to 1, shows 20 entries at a time',
    indidivualBook: '/books/booknumber',
    putRequests: '/book/booknumber with an object key of either user_rating or image_url',
    postBook: '/addbook with at least title and author object keys'
  })
})

app.get('/books', (req, res) => {
  let orderedBooks = booksData
  const keyword = req.query.keyword
  const order = req.query.order
  const page = +req.query.page || 1
  const PAGE_SIZE = 20
  let selectedPage = orderedBooks.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)

  if (keyword) {
    if (order === 'highest') {
      orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? -1 : 1)

    } else if (order === 'lowest') {
      orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? 1 : -1)

    } else if (order === 'longest') {
      orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? -1 : 1)

    } else if (order === 'shortest') {
      orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? 1 : -1)

    } else {
      orderedBooks = orderedBooks.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1)
    }
    const firstResult = orderedBooks.filter((book) => book.authors.toLowerCase().replace(/ /gi, '_').includes(keyword))
    const secondResult = orderedBooks.filter((book) => {

      if (book.title.toString().toLowerCase().replace(/ /gi, '_').includes(keyword) && firstResult.indexOf(book) === -1) {
        return true
      } else {
        return false
      }
    })

    const finalResult = firstResult.concat(secondResult)
    selectedPage = finalResult.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)
    res.json(selectedPage)
  } else if (order === 'highest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? -1 : 1)
    selectedPage = orderedBooks.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)
    res.json(selectedPage)
  } else if (order === 'lowest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? 1 : -1)
    selectedPage = orderedBooks.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)
    res.json(selectedPage)
  } else if (order === 'longest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? -1 : 1)
    selectedPage = orderedBooks.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)
    res.json(selectedPage)
  } else if (order === 'shortest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? 1 : -1)
    selectedPage = orderedBooks.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)
    res.json(selectedPage)
  } else {
    orderedBooks = orderedBooks.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1)
    selectedPage = orderedBooks.slice((page * PAGE_SIZE) - PAGE_SIZE, page * PAGE_SIZE)
    res.json(selectedPage)
  }

})


app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const book = booksData.find((book) => book.bookID === +id)
  book ? res.json(book) : res.json({ error: 'No book was found with that Id' })
})


app.put('/books/:id', (req, res) => {
  const id = req.params.id
  const foundBook = booksData.find((book) => book.bookID === +id)
  if (req.body.image_url) {
    foundBook.image_url = req.body.image_url
    res.json(foundBook)
  } else if (req.body.user_rating) {
    const rating = +req.body.user_rating
    const totalRating = (foundBook.average_rating * foundBook.ratings_count) + rating
    ++foundBook.ratings_count
    const average = totalRating / foundBook.ratings_count
    foundBook.average_rating = Math.round((average + Number.EPSILON) * 100) / 100
    res.json(foundBook)

  }
})

app.post('/books/addbook', (req, res) => {
  const newBook = {
    bookID: +booksData.length + 1,
    title: req.body.title,
    authors: req.body.author,
    average_rating: 0,
    ratings_count: 0,
    image_url: req.body.image ? req.body.image : false,
    num_pages: req.body.pages ? req.body.pages : 0
  }
  booksData.push(newBook)
  res.json(booksData)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

