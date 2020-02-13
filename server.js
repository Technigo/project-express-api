import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'
import goldenGlobesData from './data/golden-globes.json'

// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(
    'Golden Globe! /shows?country="Put in country" - /shows?title="Put in Title"'
  )
})

app.get('/listlength', (req, res) => {
  res.json(goldenGlobesData.length)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won

  console.log(showWon)

  let fromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWon) {
    fromYear = fromYear.filter((item) => item.nominee.toString())
  }

  res.json(fromYear)
})

app.get('/shows', (req, res) => {
  // Query parameter
  const titleSearchString = req.query.title
  const countrySearchString = req.query.country

  let filteredShows = netflixData

  if (titleSearchString) {
    filteredShows = filteredShows.filter((item) => {
      const itemTitle = item.title.toString()
      return itemTitle.includes(titleSearchString)
    })
  }

  if (countrySearchString) {
    filteredShows = filteredShows.filter((item) => {
      const itemCountry = item.country.toString()
      return itemCountry.includes(countrySearchString)
    })
  }

  res.json(filteredShows)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
