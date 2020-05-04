import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import globeData from './data/golden-globes.json'
// import data from './data/avocado-sales.json'
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
  res.send('Welcome')
})

app.get('/nominations', (req, res) => { res.json(goldenGlobesData) }) 
app.get('/year/:year', (req, res) => { const year = req.params.year 
  const showWon = req.query.won 
  let fromYear = globeData.filter((item) => item.year_award === +year) 
  if (showWon) { fromYear = fromYear.filter((item) => item.win) } res.json(fromYear) 
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
