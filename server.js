import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/data.json'
import netflixData from './data/netflix-titles.json'


const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/shows/', (req, res) => {
  let shows = netflixData
  const typeOfContent = req.query.type
  const showCountry = req.query.country
  const year = req.query.year
  const castMember = req.query.cast

  if (typeOfContent) {
    shows = shows.filter((item) => item.type.toLowerCase() === typeOfContent.toLowerCase())
  }
  if (showCountry) {
    shows = shows.filter((item) => item.country.toLowerCase() === showCountry.toLowerCase())
  }
  if (castMember) {
    shows = shows.filter((item) => item.cast.toLowerCase().includes(castMember.toLocaleLowerCase()))
  }
  if (year != undefined) {
    shows = shows.filter((item) => item.release_year === +year)
  }
  else {
    res.status(404).json({ error: 'not found' })
  }
 
  res.json(shows)

})

app.get('/shows/:id', (req, res) => {
  const id = req.params.id
  const showWithId = netflixData.find((item) => item.show_id === +id);
  res.json(showWithId)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})