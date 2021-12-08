import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import data from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import data from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'
// import data from './data/volcanos.json'

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
  res.send('Welcome to book api, checkout')
})

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/books', (req, res) => {
  const { pageCountHigh, pageCountLow, rating, sortRating, sortPageCount } = req.query

  let pageCountUpperLimit = Infinity
  let pageCountLowerLimit = 0
  let ratingLowerLimit = 0

  if (pageCountHigh) {
    pageCountUpperLimit = pageCountHigh
  }
  if (pageCountLow) {
    pageCountLowerLimit = pageCountLow
  }
  if (rating) {
    ratingLowerLimit = rating
  }
  if (sortRating) {
    data.sort((a, b) => b.average_rating - a.average_rating)
  }
  if (sortPageCount) {
    data.sort((a, b) => b.num_pages - a.num_pages)
  }

  const filteredData = data
    .filter(item => item.average_rating >= ratingLowerLimit)
    .filter(item => item.num_pages <= pageCountUpperLimit)
    .filter(item => item.num_pages >= pageCountLowerLimit)

  res.json(filteredData)
})

app.get('/book/:id', (req, res) => {
  const { id } = req.params
  const book = data.find(item => item.bookID === +id)
  if (!book) {
    res.status(404).send('No data found')
  } else {
    res.json(book)
  }
})

app.get('/lang/:lang', (req, res) => {
  const { lang } = req.params
  let filteredData
  if (lang === 'list') {
    filteredData = data.map(item => item.language_code).filter((v, i, a) => a.indexOf(v) === i)
  } else {
    filteredData = data.filter(item => item.language_code === lang)
  }
  if (!filteredData) {
    res.status(404).send('No data found')
  } else {
    res.json(filteredData)
  }
})

app.post('/post', (req, res) => {
  const { body } = req
  res.send(body)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
