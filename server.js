import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
 import data from './data/netflix-titles.json'
 console.log(data.length)
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

//all shows

app.get('/shows', (req, res) => {
  let shows = data
  const country = req.query.country
  console.log(country)
  if(country) shows = data.filter(item => item.country === country)
  res.json(shows)
})

//all whows limited

app.get('/shows/test', (req, res) => {
  
  
  const page = req.query.page
  let shows = data.slice(0, 50)
  if(page) shows = data.slice(page*50, page*50 + 50)
  console.log(shows.length)
  res.json(shows)
})

//tv shows

app.get('/shows/tvshows', (req, res) => {
  const tvData = data.filter(item => item.type == 'TV Show')
  res.json(tvData)
}) 

//movies

app.get('/shows/movies', (req, res) => {
  const movieData = data.filter(item => item.type == 'Movie')
  res.json(movieData)
}) 

//shows from a specific year

app.get('/shows/year/:year', (req, res) => {
  const year = req.params.year
  const showsFromYear = data.filter(item => item.release_year == year)
  res.json(showsFromYear)
})

//show with a specific title

app.get('/shows/title/:title', (req, res) => {
  const titleID = req.params.title
  const titleWithID = data.find(item => item.show_id == +titleID)
  console.log(titleWithID)
  if(!titleWithID) res.send('Not Found!!')
  else res.json(titleWithID)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
