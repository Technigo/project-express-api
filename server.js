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

/* All nominations */
app.get('/nominations', (req, res) => { 
  res.json(globeData) }) 

/* All nominations for specific year it was nominated and if winner*/
app.get('/year/:year', (req, res) => { 
  const year = req.params.year 
  const winner = req.query.won 
  let fromYear = globeData.filter((item) => item.year_award === +year) 
  
  if (winner) { 
    fromYear = fromYear.filter((item) => item.win ) 
  } 
  res.json(fromYear) 
})

app.get('/winners', (_, res) => {

  let winners = globeData.filter(item => {
    return item.win === true
  })
  
  res.json(winners)

})

app.get("/nominee/:nominee", (req, res) => {
  const nominee = req.params.nominee
  const nomineeLetter = globeData.filter(item => {
    let nomineeTitle = item.nominee.toString()
    return nomineeTitle.toLowerCase().charAt(0) === nominee.toLowerCase().charAt(0)
  })

  res.json(nomineeLetter)
})

  app.get('/nominee/:nominee', (req, res) => {
  const nominee = req.params.nominee
  let resultTitle = globeData.filter((item) => item.nominee === +nominee)

  res.json(resultTitle)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
