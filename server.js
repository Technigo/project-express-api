import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

console.log(netflixData.length)
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

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world hej hej')
})

// app.get('/types', (req, res) => {
//   res.json(netflixData)

// })

// router  to finding specific year //
//http://localhost:8080/year/2019

// app.get('/year/:year', (req, res) => {
//   const year = req.params.year
//   const showCountry = req.query.country
//   console.log('showCountry')
//   let releasesFromYear = netflixData.filter((item) => item.release_year === +year)
// res.json(releasesFromYear)


//   if (showCountry) {
//     releasesFromYear = releasesFromYear.filter((item) => item.country)
//   }
//   res.json(releasesFromYear)
// })

//// TEST ///// 

// path variable/path parameter
app.get('/shows', (req, res) => {
  // query parameter 
  const searchString = req.query.search

  let filteredShows = netflixData
  // const searchString: any

  if (searchString) {
    // Filter once 
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString()
      const itemCountry = item.country.toString()
      const itemDescription = item.description.toString()

      return itemTitle.includes(searchString) ||
        itemCountry.includes(searchString) ||
        itemDescription.includes(searchString)
    })
  }

  res.json(filteredShows)
})

// http://localhost:8080/country/Sweden
// app.get('/country/:country', (req, res) => {
//   const country = req.params.country
//   const fromCountry = netflixData.filter((item) => item.country === country)
//   res.json(fromCountry)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
