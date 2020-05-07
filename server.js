import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// import goldenGlobesData from './data/golden-globes.json'



// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
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
  res.send('Endpoints = /Shows & /titles/titles & year/year & a 404 message if title is not found' )
})

app.get('/shows', (req, res)=> {
  res.json(netflixData)
})


app.get('/titles/:title', (req, res)=> {
  const title = req.params.title

  let movieTitle = netflixData.filter((item) => item.title.toString().toLowerCase() === title.toLowerCase())
  if (movieTitle.length > 0) {
  res.json(movieTitle)
} else {
  res.status(404).json({message: `${title} not found`})
}
})


 app.get('/year/:year', (req, res) => {
    const year = req.params.year
    const showType = req.query.type
   let release = netflixData.filter((item) => item.release_year === +year)


   if (showType) {
      release = release.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
    }
    res.json(release)

  })



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
