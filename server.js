import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'


// {
//   "show_id": 81193313,
//   "title": "Chocolate",
//   "director": "",
//   "cast": "Ha Ji-won, Yoon Kye-sang, Jang Seung-jo, Kang Bu-ja, Lee Jae-ryong, Min Jin-woong, Kim Won-hae, Yoo Teo",
//   "country": "South Korea",
//   "date_added": "November 30, 2019",
//   "release_year": 2019,
//   "rating": "TV-14",
//   "duration": "1 Season",
//   "listed_in": "International TV Shows, Korean TV Shows, Romantic TV Shows",
//   "description": "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
//   "type": "TV Show"
// },


//Endpoints som jag ska anv:
// TV show (från "type")
// Movie (från "type")


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
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

//BELOW SHOWS ALL TITLES
app.get('/titles', (req, res) => { //req = request-object, res = result-object, 
  //Here we use the response object to stat building up the response to send back to the browser/the one requesting the data by GET
  res.json(netflixData)
})

//BELOW FILTERS TO SHOW ONLY THE TV-SHOWS
app.get('/shows', (req, res) => { //req = request-object, res = result-object, 
  //Here we use the response object to stat building up the response to send back to the browser/the one requesting the data by GET
  const shows = netflixData.filter((item) => item.type === "TV Show")
  res.json(shows)
})

app.get('/shows/:id', (req, res) => {
  const id = req.params.id
  console.log({ id })
  const showsId = netflixData.filter((shows) => shows.type === "TV Show" && shows.show_id === +id)
  res.json(showsId)
})


//BELOW FILTERS TO SHOW ONLY THE MOVIES
app.get('/movies', (req, res) => { //req = request-object, res = result-object, 
  //Here we use the response object to stat building up the response to send back to the browser/the one requesting the data by GET
  // res.json(netflixData)
  const movies = netflixData.filter(movies => (movies.type === "Movie"))

  res.json(movies)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
