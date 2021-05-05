import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

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
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(netflixData)
})

app.get('/:title', (req, res) => {
  const { title } = req.params
  const findShow = netflixData.find((show) => show.title === title)
  res.json(findShow)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Hello, Server running on http://localhost:${port}`)
})
