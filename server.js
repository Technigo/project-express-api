import express from 'express'
import bodyParser from 'body-parser'
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
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/titles', (req, res) => {
  //query parameter
  const searchString = req.query.search

  let filtredTitles = netflixData

  if (searchString) {
    //Filter once on multiple fields

    filtredTitles = filtredTitles.filter(item => {
      const itemTitle = item.title.toString()
      const itemDirector = item.director.toString()
      const itemCountry = item.country.toString()

      return itemTitle.toLowerCase().includes(searchString) ||
        itemDirector.toLowerCase().includes(searchString) ||
        itemCountry.toLowerCase().includes(searchString)
    })
  }
  res.json(filtredTitles)
})


//Filter out type: Tv Show or Movie (correct spelling needed)
app.get('/titles/:type', (req, res) => {
  const type = req.params.type
  let typeOf = netflixData.filter((item) => item.type === type)
  res.json(typeOf)
})


//Find a specific title id (ex. 81193313 )
app.get('/id/:id', (req, res) => {
  let id = req.params.id
  let showId = netflixData.find((item) => item.show_id === +id)
  if (!showId) {
    res.status(404)
    res.send('Not found')

  }
  res.json(showId)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
