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
  const { title, cast } = req.query
  
  if (title) {
    const filteredMovies = netflixData.filter((movie) => movie.title.toString().includes(title))
    res.json(filteredMovies) 
  } else if (cast) {
    const filteredActors = netflixData.filter((movie) => movie.cast.toString().includes(cast))
    res.json(filteredActors) 
  } 
  res.json(netflixData)
}) 

app.get('/movies/:pages', (req, res) => {
  const { pages } = req.params
  const pagesCount = netflixData.slice(0, pages)
  res.json(pagesCount)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const netflixId = netflixData.find((item) => item.show_id === +id)

  if (netflixId) {
    res.json({ data: netflixId })
  } else {
    res.status(404).json({ error: 'Not found, try again!' })
  }
})

app.get('/movies/year/:year', (req, res) => {
  const { year } = req.params  
  const { showType } = req.query                
  let releaseYear = netflixData.filter((item) => item.release_year === +year)

  if (showType) {
    releaseYear = releaseYear.filter((item) => item.type.toString().includes(showType)) 
  }
  res.json(releaseYear)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`)
}) 
