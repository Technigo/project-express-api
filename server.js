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
app.use(bodyParser.json())

// Start defining your RESTful end points/routes here
app.get('/catalogue', (req, res) => {
  res.json(netflixData)
})

app.get('/type/:type', (req, res) => {
  let type = req.params.type.toLowerCase().replace(/[-_ ]/, "")
  if (type === "tvshow" || type === "show" || type === "tv") {
    type = "TV Show"
  } else if (type === "movie") {
    type = "Movie"
  }
  const catalogueType = netflixData.filter((item) => item.type === type)
  res.json(catalogueType)
})
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  let type = req.query.type
  let catalogueYear = netflixData.filter((item) => item.release_year === +year)

  if (type) {
    type = type.toLowerCase().replace(/[-_]/, "")
    if (type === "tvshow" || type === "show" || type === "tv") {
      type = "TV Show"
    } else if (type === "movie") {
      type = "Movie"
    }
    catalogueYear = catalogueYear.filter((item) => item.type === type)
  }
  res.json(catalogueYear)

})
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
