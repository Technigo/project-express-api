import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/movies', (req, res) => {
  const { year, show, page } = req.query
  let moviesToSend = netflixData

  if (year) {
    moviesToSend = netflixData
      .filter((release) => release.release_year === +year)
  } 

  if (show) {
    moviesToSend = netflixData
      .filter((item) => item.type.toString().toLowerCase().includes(show)) 
  } 

  if (page) {
    moviesToSend = netflixData.slice(0, page)
  }

  res.json({ length: netflixData.length, data: moviesToSend })
}) 

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const netflixId = netflixData.find((item) => item.show_id === +id)

  if (id) {
    res.json({ data: netflixId })
  } else {
    res.status(404).json({ error: 'Not found, try again!' })
  }
})

// flytta title till query ??
app.get('/movies/title/:title', (req, res) => {
  const { title } = req.params
  const filteredMovieTitle = netflixData.find((movie) => movie.title.toString().includes(title))

  if (filteredMovieTitle) {
    res.json({ data: filteredMovieTitle }) 
  } else {
    res.status(404).json({ error: 'Not found, try again!' })
  }
}) 

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`)
}) 
