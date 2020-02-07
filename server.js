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

app.get('/', (req, res) => {
  res.redirect(301, '/netflix?page=1&perPage=12')
})

// display all the
app.get('/shows', (req, res) => {

  let page = parseInt(req.query["page"], 10) ?? 0;
  let perPage = parseInt(req.query["perPage"], 10) ?? 5;

  let sliceStart = page * perPage;
  let sliceEnd = sliceStart + perPage;
  res.render('pages/shows', {
    allData: netflixData.slice(sliceStart, sliceEnd),
    endpoint: '/shows'
  })
})


app.get('/movies', (req, res) => {
  let movies = netflixData.filter((item) => item.type === "Movie")

  let page = parseInt(req.query["page"], 10) ?? 0;
  let perPage = parseInt(req.query["perPage"], 10) ?? 5;

  let sliceStart = page * perPage;
  let sliceEnd = sliceStart + perPage;

  res.render('pages/movies', {
    movies: movies.slice(sliceStart, sliceEnd),
    endpoint: '/movies'
  })
})



app.get('/tv-shows', (req, res) => {
  let tvshows = netflixData.filter((item) => item.type === "TV Show")

  let page = parseInt(req.query["page"], 10) ?? 0;
  let perPage = parseInt(req.query["perPage"], 10) ?? 5;

  let sliceStart = page * perPage;
  let sliceEnd = sliceStart + perPage;

  res.render('pages/tv-shows', {
    tvshows: tvshows.slice(sliceStart, sliceEnd),
    endpoint: '/tv-shows'

  });
})


app.get('/show/id/:id', (req, res) => {
  const id = req.params.id
  const show = netflixData.find((item) => item.show_id === +id)

  if (!show) { res.status(404).send() }

  res.render('pages/show', {
    show: show,
  });
});



// http://localhost:8080/api/netflix?country=nigeria&year=2018
app.get('/api/netflix', (req, res) => {

  let result = netflixData

  if (req.query.year != undefined) {
    result = result.filter((item) => item.release_year === Number(req.query.year))
  }

  if (req.query.country != undefined) {
    result = result.filter((item) => item.country.toLowerCase() === req.query.country.toLowerCase())
  }

  res.json(result)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})



