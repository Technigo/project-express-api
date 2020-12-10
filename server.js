import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
//import data from './data/golden-globes.json'
import data from './data/disney.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//routes 
app.get('/', (req, res) => {
  res.send('DISNEY TIME')
})

// all movies
app.get('/movies', (req, res) => {
  res.json(data)
})

//movie name
app.get('/movies/:movie', (req, res) => {
  const { movie } =req.params
  const oneMovie = data.filter((item) => item.movie_title === movie)

  if (oneMovie.length > 0 ) {
    res.json(oneMovie)
  }
  else {
    res.status(404).send({message: 'no movie found'})
  }
})

//genre 
app.get('/movies/genre/:genre', (req, res) => {
  const genre = req.params.genre
  const oneGenre = data.filter((item) => item.genre === genre)

  if (oneGenre.length > 0 ) {
    res.json(oneGenre)
  }
  else {
    res.status(404).send({message: 'no genre found'})
  }
})


//endpoints for redlevel

app.get('/movies/release/:release', (req, res) => {
  // release date 
})

app.get('/movies/rating/:rating', (req, res) => {
  // mpaa_rating
})

app.get('/movies/total/total-gross', (req, res) => {
  // total gross 
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
