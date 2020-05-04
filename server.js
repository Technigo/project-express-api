import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './data/golden-globes.json'

console.log(goldenGlobesData.length)

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 

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
  res.send('Golden Globe nominations 2010-2019')
})

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year  
  const showWin = req.query.win
  let fromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWin) {
    fromYear = fromYear.filter((item) => item.win)
  }

  res.json(fromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
