import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Home page
app.get('/', (req, res) => {
  res.send('This is an API with 1375 Netflix titles. Have fun exploring it! Possible routes: /titles, /titles/:id, /directors/:director, /releaseyear/:year')
})

// Gets the title with a specific id
app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const titleId = netflixData.find((item) => item.show_id === +id)
  if (titleId) {
    res.json(titleId)
  } else {
    res.status(404).send(`Sorry, no title was found with id: ${id}.`)
  }
})

// Gets all titles in the API
app.get('/titles', (req, res) => {

  // Queries for type, country and director:
  let titles = netflixData
  const showType = req.query.type
  const showCountry = req.query.country
  const showDirector = req.query.director

  if (showType) {
    titles = titles.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
  } if (showCountry) {
    titles = titles.filter((item) => item.country.toLowerCase().includes(showCountry.toLocaleLowerCase()))
  } if (showDirector) {
    titles = titles.filter((item) => item.director.toLowerCase().includes(showDirector.toLowerCase()))
  }
  res.json(titles)
})

// Gets everything a specific director has directed
app.get("/directors/:director", (req, res) => {
  const director = req.params.director
  const titlesWithDirector = netflixData.filter((item) =>
    item.director.toLowerCase().includes(director.toLowerCase())
  );
  res.json(titlesWithDirector);
});

// Gets titles released a specific year
app.get('/releaseyear/:year', (req, res) => {
  const year = req.params.year

  // Query for type (TV show or movie):
  const showType = req.query.type
  let titlesFromYear = netflixData.filter((item) => item.release_year === + year)

  if (showType) {
    titlesFromYear = titlesFromYear.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
  }
  res.json(titlesFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
