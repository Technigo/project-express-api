import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import jsonData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/titles', (req, res) => {
  const titles = jsonData
  res.send({ numTitles: titles.length, titles })
})

// Pagination
app.get('/titles/page', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < jsonData.length) {
    results.next = {
      page: +page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: +page - 1,
      limit: limit
    }
  }

  results.titles = jsonData.slice(startIndex, endIndex)

  res.send({ numTitles: results.titles.length, results })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
