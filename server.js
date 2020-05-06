import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. 
// For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// const listEndpoints = require('express-list-endpoints')

// Home page
app.get('/', (req, res) => {
  res.send('This is an API with 1375 Netflix titles. Have fun exploring it! Possible routes: /titles, /titles/:id, /directors/:director, /releaseyear/:year')
})

// app.get('/', (req, res) => {
//   res.send(listEndpoints(app))
// })

// Endpoint, returns the title with a specific id
app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const titleId = netflixData.find((item) => item.show_id === +id)
  if (titleId) {
    res.json(titleId)
  } else {
    res.status(404).send(`Sorry, no title was found with id: ${id}.`)
  }
})

//Endpoint, returns all titles from netflix-titles.json
app.get('/titles', (req, res) => {
  let titles = netflixData

  //Query for page
  //Makes the number written in url to integer
  let pageSearch = req.query.page

  //Checks how many pages there is if every page has 10 objects
  const pageCount = titles.length / 10

  //If there's no page-query in the url, show first page
  if (!pageSearch) {
    pageSearch = 1
  }
  //If the page-query is bigger than the pageCount it should show the last page
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }

  // Query for type: filter and return only TV shows or only movies 
  const showType = req.query.type
  if (showType) {
    titles = titles.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
    const pageCount = titles.length / 10
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    } if (titles.length === 0) {
      res.status(404).send(`Couldn't find any ${showType}`)
    } else {
      res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  // Query for country: filter and return only titles from the specified country
  const showCountry = req.query.country
  if (showCountry) {
    titles = titles.filter((item) => item.country.toLowerCase().includes(showCountry.toLocaleLowerCase()))
    const pageCount = titles.length / 10
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    } if (titles.length === 0) {
      res.status(404).send(`Couldn't find any titles from ${showCountry}`)
    } else {
      res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  // Query for director: filter and return only titles from the specified director
  const showDirector = req.query.director
  if (showDirector) {
    titles = titles.filter((item) => item.director.toLowerCase().includes(showDirector.toLocaleLowerCase()))
    const pageCount = titles.length / 10
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    } if (titles.length === 0) {
      res.status(404).send(`Couldn't find any titles from ${showDirector}`)
    } else {
      res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  //Slice the data, begin on the page written in query
  res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
})

// Endpoint, returns titles released a specific year
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  let pageSearch = req.query.page
  const titlesFromYear = netflixData.filter((item) => item.release_year === + year)
  const pageCount = titlesFromYear.length / 10

  if (!pageSearch) {
    pageSearch = 1
  }
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }
  if (titlesFromYear.length === 0) {
    res.status(404).send(`Couldn't find any boardgame from year ${year}`)
  } else {
    res.json(titlesFromYear.slice(pageSearch * 10 - 10, pageSearch * 10))
  }
})


// // Endpoint, returns everything a specific director has directed (no pages)
// //Commented this out as I decided to make a query for director instead
// app.get("/directors/:director", (req, res) => {
//   const director = req.params.director
//   const titlesWithDirector = netflixData.filter((item) =>
//     item.director.toLowerCase().includes(director.toLowerCase())
//   )
//   res.json(titlesWithDirector)
// })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
