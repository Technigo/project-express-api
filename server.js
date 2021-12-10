import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'The Book API',
      version: '1.0.0',
    },
  },
  apis: ['./server.js'], // files containing annotations as above
}
const swaggerSpec = swaggerJsdoc(options)

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /endpoints:
 *   get:
 *     summary: Lists all endpoints
 *     responses:
 *       200:
 *         description: OK.
 */
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: List books based on query
 *     parameters:
 *      - name: title
 *        in: query
 *        required: false
 *        format: string
 *      - name: rating
 *        in: query
 *        required: false
 *        format: integer
 *      - name: sortRating
 *        in: query
 *        required: false
 *        format: boolean
 *      - name: pageCountLow
 *        in: query
 *        required: false
 *        format: integer
 *      - name: pageCountHigh
 *        in: query
 *        required: false
 *        format: integer
 *      - name: sortPageCount
 *        in: query
 *        required: false
 *        format: boolean
 *     responses:
 *       200:
 *         description: OK.
 */
app.get('/books/search', (req, res) => {
  const { title, rating, sortRating, pageCountHigh, pageCountLow, sortPageCount } = req.query

  let resultsToSend = data
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
    resultsToSend.sort((a, b) => b.average_rating - a.average_rating)
  }
  if (sortPageCount) {
    resultsToSend.sort((a, b) => b.num_pages - a.num_pages)
  }
  if (title) {
    resultsToSend = resultsToSend.filter(
      item => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    )
  }

  const filteredData = resultsToSend
    .filter(item => item.average_rating >= ratingLowerLimit)
    .filter(item => item.num_pages <= pageCountUpperLimit)
    .filter(item => item.num_pages >= pageCountLowerLimit)

  res.json({ filteredData, success: true })
})

/**
 * @swagger
 * /book/isbn/{isbn}:
 *   get:
 *     summary: Returns a book by ISBN
 *     parameters:
 *      - name: isbn
 *        in: path
 *        required: true
 *        format: integer
 *     responses:
 *       200:
 *         description: OK.
 */
app.get('/book/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const book = data.find(item => item.isbn === +isbn || item.isbn13 === +isbn)
  if (!book) {
    res.status(404).send('No data found')
  } else {
    res.json(book)
  }
})

app.get('/books/all', (req, res) => {
  res.json(data)
})

/**
 * @swagger
 * /book/lang/{lang}:
 *   get:
 *     summary: Returns all books by language
 *     parameters:
 *      - name: lang
 *        in: path
 *        required: true
 *        format: string
 *     responses:
 *       200:
 *         description: OK.
 */
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
  res.json(body)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
