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

// Homepage
app.get('/', (req, res) => {
  res.send('Netflix titles')
})

// One title
app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const title = jsonData.find(item => item.show_id === +id)
  if (title === undefined) {
    console.log('empty')
    res.status(400).send(`There's no matching title`)
  } else {
    res.send(title)
  }
})

// All titles
app.get('/titles', paginatedResult(jsonData), (req, res) => {
  res.send(res.paginatedResult)
})

// Filtering movies with params
app.get('/movies', (req, res) => {
  const movies = jsonData.filter(item => item.type === "Movie")
  res.send(movies)
})

app.get('/movies/filter', (req, res) => {
  const year = req.query.year
  const movies = jsonData.filter(item => item.release_year === +year)
  res.send(movies)
})

// Filtering tv shows with params
app.get('/tv-shows', (req, res) => {
  const shows = jsonData.filter(item => item.type === "TV Show")
  res.send(shows)
})

app.get('/tv-shows/filter', (req, res) => {
  const year = req.query.year
  const shows = jsonData.filter(item => item.release_year === +year)
  res.send(shows)
})

// Function for pagination
function paginatedResult(model) {
  return (req, res, next) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {
      maxPages: parseInt(model.length / limit)

    }

    if (endIndex < model.length) {
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

    results.titles = model.slice(startIndex, endIndex)

    res.paginatedResult = results
    next()
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
