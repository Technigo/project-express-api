import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Netflix data. You can find all movies using /data, titles using /title, movies from a specific year with /year/[year] and a specific movie using /movie/[id]')
})

app.get('/data', (req, res) => {
  res.json(netflixData)
})

app.get('/title', (req, res) => {
const titles = netflixData.map((item) => item.title)  
res.json(titles)

})

 app.get('/year/:year', (req, res) => {
  const year = req.params.year
  let releaseYear = netflixData.filter((item ) => item.release_year === +year)
  res.json(releaseYear)
 })

 app.get('/movie/:id', (req, res) => {
   let id = req.params.id 
  
   let movieId = netflixData.filter((item) => item.show_id === +id)

   if (movieId.lenght > 0) {
     res.json(movieId)
   } else {
     res.status(404).json({ Message: 'Show not found'})
   }
     
 })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
