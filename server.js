import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import data from './data/netflix-titles.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
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

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(data)
})

app.get('/years', (req, res) => {
  res.json(data)
})
app.get('/years/:year', (req, res) => {
  const year = req.params.year
  const releaseYear = data.filter((item) => item.release_year === +year)
    res.json(releaseYear)
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// import csvtojson from 'csvtojson'
// npm i --save csvtojson






//why does this not work as it does above?
// app.get('/type/:type', (req, res) => {
//   const type = req.params.type
//   const movieOrSeries = data.filter(item => item.type === type)
//   res.json(movieOrSeries)
// })
// const ERROR_NOT_FOUND = {error : 'Nothin found'}
// Add middlewares to enable cors and json body parsing
  //why doesn not the error work?
  // if(releaseYear.length === 0){
  //   res.status(404).json(ERROR_NOT_FOUND)
  // }else {