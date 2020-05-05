import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'


// import goldenGlobesData from './data/golden-globes.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 

// import avocadoSalesData from './data/avocado-sales.json'

// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('ELLO ELLO')
})

app.get('/books', (req, res) => {
  let orderedBooks = booksData
  const keyword = req.query.keyword
  const order = req.query.order
  const page = +req.query.page || 1
  let selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)

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
    selectedPage = finalResult.slice((page * 20) - 20, page * 20)
    res.json(selectedPage)
  } else if (order === 'highest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? -1 : 1)
    selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
    res.json(selectedPage)
  } else if (order === 'lowest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? 1 : -1)
    selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
    res.json(selectedPage)
  } else if (order === 'longest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? -1 : 1)
    selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
    res.json(selectedPage)
  } else if (order === 'shortest') {
    orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? 1 : -1)
    selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
    res.json(selectedPage)
  } else {
    orderedBooks = orderedBooks.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1)
    selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
    res.json(selectedPage)
  }

})

// app.get('/books/search', (req, res) => {
//   const keyword = req.query.keyword

//   const firstResult = booksData.filter((book) => book.authors.toLowerCase().replace(/ /gi, '_').includes(keyword))
//   const secondResult = booksData.filter((book) => book.title.toString().toLowerCase().replace(/ /gi, '_').includes(keyword))
//   const finalResult = firstResult.concat(secondResult)
//   res.json(finalResult)
// })

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const book = booksData.find((book) => book.bookID === +id)
  book ? res.json(book) : res.json({ error: 'No book was found with that Id' })
})

app.get('/authors/:author', (req, res) => {
  const author = req.params.author.toLowerCase()
  const selectedAuthor = booksData.filter((book) => book.authors.toLowerCase().replace(' ', '_').includes(author))
  res.json(selectedAuthor)
  selectedAuthor.length > 0 ? res.json(selectedAuthor) : res.send('No authors with that name were found')
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
    foundBook.average_rating = totalRating / foundBook.ratings_count
    res.json(foundBook)

  }
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

