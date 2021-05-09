import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './data/golden-globes.json'

// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

app.use(express.json())

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to my API')
})

app.get('/nominations', (req, res) => {
  const { title } = req.query
  let dataRes = goldenGlobesData

  if (title) {
    dataRes = dataRes.filter((item) => item.film.toString().toLowerCase().includes(title.toLowerCase()));
  }
  if (dataRes.length === 0) {
    res.status(404).send(`No results found`);
  }

  res.json(dataRes)
})

app.get('/year/:year', (req, res) => {
  const { year } = req.params
  const showWon = req.query.won
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (nominationsFromYear.length === 0) {
    res.status(404).send(`No movies found for ${year}`)
  }

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  
  res.json(nominationsFromYear)
})

app.post('/nominations', (req, res) => {
  const nomination = {
    year_film: req.body.year_film,
    year_award: req.body.year_award,
    ceremony: req.body.ceremony,
    category: req.body.category,
    nominee: req.body.nominee,
    film: req.body.film,
    win: req.body.win
  }
  goldenGlobesData.push(nomination)
  res.send(nomination)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
