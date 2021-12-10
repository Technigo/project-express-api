import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import netflixData from './data/netflix-titles.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining routes here
app.get('/', (req, res) => {
  res.send('Welcome to my API. You can find some selected Netlify-data here')
})

//route provides all endpoints
app.get('/endpoints', (req, res) => {
  res.json({
    response: listEndpoints(app),
    success: true
  })
})

// route provides a sorted list of all countries that are in netflixData
app.get('/countries', (req, res) => {
  const countries = Array.from(new Set(netflixData.map(item => item.country))).sort()
  res.json({
    response: countries,
    success: true
  })
})

// route with all movies from the provided country
app.get('/countries/:country', (req, res) => {
  const { country } = req.params
  const contentByCountry = netflixData.filter((item => item.country.toLowerCase() === country))

  if (!contentByCountry) {
    res.status(404).json({
      response: 'Sorry, but there is no content for this country',
      success: false
    })
  } else {
    res.json({
      response: contentByCountry,
      success: true
    })
  } 
})

// route provides all movies and has the possibility to query for director, year and actor
app.get('/movies', (req, res) => {
  const { director, year, actor } = req.query

  const movies = netflixData.filter(item => item.type === "Movie")

  let filteredMovies = movies

  if (director) {
    filteredMovies = filteredMovies.filter((item) => item.director.toLowerCase().includes(director.toLowerCase()) === true)
  }

  if (year) {
    filteredMovies = filteredMovies.filter((item) => item.release_year === +year)
  }

  if (actor) {
    filteredMovies = filteredMovies.filter(item => item.cast.toLowerCase().includes(actor.toLowerCase()) === true)
  }

  res.json({
    response: filteredMovies,
    success: true
  })
})

// route provides one movie by ID
app.get('/movies/id/:id', (req, res) => {
  const { id } = req.params
  const movie = netflixData.find(item => item.show_id === +id)

  if (!movie) {
    res.status(404).json({
      response: 'No movie found, that matches this ID',
      success: false
    })
  } else {
    res.json({
      response: movie,
      success: true})
  }
})

// route provides movies by name (can return more than one movie, if the provided parts of the title match with several movies)
app.get('/movies/title/:title', (req, res) => {
  const { title } = req.params
  const movie = netflixData.filter(item => item.title.toLowerCase().includes(title.toLowerCase()) === true)

  if (!movie) {
    res.status(404).json({
      response: 'No movie found, that matches this ID',
      success: false
    })
  } else {
    res.json({
      response: movie,
      success: true
    })
  }
})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})

  
