import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// Min api
//https://fethullah-week17-project-api.herokuapp.com/


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
import goldenGlobesData from './data/golden-globes.json'
console.log(goldenGlobesData.length)
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

// TO DO 
// Du kan göra knappar så att ifall jag trycker på en knapp så får jag filmer i enlighet med år etc etc. att du ändå gör frontend delen

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  const nominationPerYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if(showWon) {
    const onlyWon = nominationPerYear.filter((item) => item.win)
    res.json(onlyWon)
  }

  res.json(nominationPerYear)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
