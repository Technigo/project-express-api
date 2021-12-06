import express from 'express'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello goldenglobe')
})

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (req, res) => {
  const { year } = req.params
  const moviesFromYear = goldenGlobesData.filter(item => item.year_film === +year)

  if (moviesFromYear.length === 0) {
    res.status(404).send('No movies found')
  } else {
    res.json(moviesFromYear)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
