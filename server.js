import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:

//   PORT=9000 npm start  or npm dev run
const port = process.env.PORT || 9000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to the Netflix data API')
})


// Show all data - https://netflix-dummy-data.herokuapp.com/shows

app.get('/shows', (req, res) => {
  res.json(netflixData)
})

// Show all data - 
// https://netflix-dummy-data.herokuapp.com/shows/:id
// example : https://netflix-dummy-data.herokuapp.com/shows/81197050

app.get('/shows/:id', (req,res) => {
  const id = req.params.id
  let showId = netflixData.find((item) => item.show_id === +id)
  res.json(showId)
})

// Search Title with search query -
// We can use the query method since several movies/shows can have the same name.
// We have to /https://netflix-dummy-data.herokuapp.com/shows/title?title=xxx
// example: https://netflix-dummy-data.herokuapp.com/shows/title?title=cho

app.get('/shows/title', (req, res) => {
  const title  = req.query.title
  if (title) {
    const filteredTitle = netflixData.filter((item) => item.title === title)
    res.json(filteredTitle)
  } else {
    res.json(netflixData)
  }
})

// Search by Titles -
// https://netflix-dummy-data.herokuapp.com/titles/<title-name>
// example : https://netflix-dummy-data.herokuapp.com/titles/Chocolate

app.get('/titles/:title', (req,res) => {
  const title = req.params.title
  let movieTitle = netflixData.filter((item) => item.title.toString().toLowerCase() === title.toLowerCase())

  if (movieTitle.length > 0) {
    res.json(movieTitle)
  } else {
    res.status(404).json({message: `${title} not found !`})
  }w
})

// Search by Years -
// https://netflix-dummy-data.herokuapp.com/year/<year>
// example : https://netflix-dummy-data.herokuapp.com/year/2001

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showType = req.query.type
  let release = netflixData.filter((item) => item.release_year === +year)

  if (showType) {
    release = release.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
    }
    res.json(release)
  })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

