import express from 'express'
import cors from 'cors'
import wineData from './data/wines.json'

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
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Route to get all wines

app.get('/wines', (req, res) => {

  // const winery = req.query.winery
  // const title = req.query.title
  
  // if (winery) {
  //   wineData = wineData.filter((wine) => wine.winery.toLowerCase() === winery)
  // } 

  // if (title) {
  //   wineData = wineData.filter((wine) => wine.title.toLowerCase() === title)
  // }

  // if (wineData.length === 0) {
  //   res.status(404).send('No such wine!')
  // }

  res.json(wineData)
})



// app.get('/wines/:country', (req, res) => {
//   const country = req.params.country
//   const wineByCountry = wines.filter((wineCountry) => wineCountry.wineByCountry.toLowerCase() === country)


//   if (!wineByCountry) {
//     res.status(404).send('No such country!')
//   } else {
//     res.json(wineByCountry)
//   }
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
