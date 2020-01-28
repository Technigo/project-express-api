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

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.send(netflixData)
})

// GET TYPE OF SHOW (TV SHOW | MOVIE)
// app.get('/types/:type', (req, res) => {
//   // Variable to get data from selected type (for the route placeholder :type)
//   const type = req.params.type
//   console.log({ type })
//   // Variable to filter out selcted type
//   let typeOfShow = netflixData.filter((item) => item.type === type)
//   // Return the filtered type
//   res.json(typeOfShow)
// })

// GET RELEASE YEAR 
app.get('/years/:year', (req, res) => {
  const year = req.params.year
  console.log({ year })
  let releaseYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releaseYear)
  console.log(releaseYear.length)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
