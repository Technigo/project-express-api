import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static("public"))



// display all the netflix data
app.get('/netflix', (req, res) => {
  res.render('pages/data', {
    data: netflixData
  })
})


app.get('/movies', (req, res) => {
  let movies = netflixData.filter((item) => item.type === "Movie")

  res.render('pages/movies', {
    movies: movies
  })
})

app.get('/tv-shows', (req, res) => {
  let TvShows = netflixData.filter((item) => item.type === "TV Show")

  res.render('pages/tv-shows', {
    tvshows: TvShows
  });
})



//display the tv-shows and release-year
//http://localhost:8080/tv-shows/2015
app.get('/tv-shows/:year', (req, res) => {
  const year = req.params.year

  // Error handling - if year is not a number
  if (isNaN(Number(year))) {
    res.statusCode = 400
    res.send("Error, must send a year")
  }
  let TvShows = netflixData.filter((item) => item.type === "TV Show" &&
    item.release_year === +year)

  res.json(TvShows)
})

app.get('/movies/:year', (req, res) => {
  const year = req.params.year

  // Error handling - if year is not a number
  if (isNaN(Number(year))) {
    res.statusCode = 400
    res.send("Error, must send a year")
  }
  let Movies = netflixData.filter((item) => item.type === "Movie" &&
    item.release_year === +year)

  res.json(Movies)
})


// http://localhost:8080/api/netflix?country=nigeria&year=2018
app.get('/api/netflix', (req, res) => {

  let result = netflixData
  console.log(req.query.year)

  if (req.query.year != undefined) {
    result = result.filter((item) => item.release_year === Number(req.query.year))
  }

  if (req.query.country != undefined) {
    result = result.filter((item) => item.country.toLowerCase() === req.query.country.toLowerCase())
  }

  res.json(result)
})


app.get('/netflix/id/:id', (req, res) => {
  const id = req.params.id
  const result = netflixData.find((item) => item.show_id === +id)

  if (!result) {res.status(404).send()}
  
  res.json(result)
});









// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})



