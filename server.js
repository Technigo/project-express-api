import express from 'express'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
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

// Start defining routes here
app.get('/', (req, res) => {
  res.send('Welcome to my API. You can find some selected Netlify-data here')
})

// route provides a sorted list of all countries that are in netflixData
app.get('/countries', (req, res) => {
  const countries = Array.from(new Set(netflixData.map(item => item.country))).sort()
  res.json(countries)
})

// route with all movies from the provided country
app.get('/countries/:country', (req, res) => {
  const { country } = req.params
  const moviesByCountry = netflixData.filter((item => item.country.toLowerCase() === country))
  res.json(moviesByCountry)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
