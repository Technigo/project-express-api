import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

//PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello')
})

// Returns: All data from netflix  
app.get('/titles', (req, res) => {
  const page = req.query.page ?? 0
  const pageSize = req.query.pageSize ?? 20
  const startIndex = page * pageSize
  const endIndex = startIndex + +pageSize
  const titlesPerPage = netflixData.slice(startIndex, endIndex)
  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(netflixData.length / pageSize),
    results: titlesPerPage
  }
  res.send(returnObject)
})

app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const titleId = netflixData.filter((item) => item.show_id === +id)
  if (!titleId) {
    res
      .status(404)
      .send({ error: `No movie or tv show found with id: "${id}" found` });
  }
  res.json(contentWithId);
});

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const releasesFromYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releasesFromYear)
})

app.get('/type/:movie', (req, res) => {
  const isMovie = netflixData.filter((item) => item.type === 'Movie')
  res.json(isMovie)
})

app.get('/type/:tvshow', (req, res) => {
  const isTvShow = netflixData.filter((item) => item.type === 'TV Show')
  res.json(isTvShow)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})