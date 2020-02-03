import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'


const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello world')
})


app.get('/all', (req, res) => {
  res.json(netflixData)
})

app.get('/shows/', (req, res) => {
  const shows = netflixData.filter((item) => item.type === "TV Show")
  res.json(shows)
})

app.get('/shows/:id', (req, res) => {
  const id = req.params.id
  const showsId = netflixData.filter((shows) => shows.type === "TV Show" && shows.show_id === +id)
  res.json(showsId)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const anyTypeFromYear = netflixData.filter((item) => item.release_year === +year)
  res.json(anyTypeFromYear)
})


app.get('/movies', (req, res) => {
  const movies = netflixData.filter(movies => (movies.type === "Movie"))
  res.json(movies)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
