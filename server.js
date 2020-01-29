import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/netflix-data', (req, res) => {
  res.json(netflixData)
})

app.get('/tv-shows', (req, res) => {
  let showSeries = netflixData.filter((item) => item.type === "TV Show")
  res.json(showSeries)
})

app.get('/netflix/:type', (req, res) => {
  const kind = req.params.type
  let show = netflixData.filter((item) => item.type.toLowerCase() === kind.toLowerCase())
  res.json(show)

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
