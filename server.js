import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
// initialazing new express server 
const app = express()

// Add middlewares to enable cors and json body parsing
// Cors makes it easier to use the API, allows API's to say where the requests come from.
// bodyParser allows express to read json in post requests
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// this is an endpoint 
app.get('/', (req, res) => {
  res.send('Hello world')
})

// FIRST ENDPOINT 
app.get('/shows', (req, res) => {
  const { type, year } = req.query

  if (type) {
    /* tolocaleLowerCase() sets the data in type array data to lowercase, 
    then includes returns true if a string contains type from url */
    const typeArray = netflixData.filter(
      (item) => item.type.toLowerCase().includes(type.toLowerCase()) 
    )

    if (typeArray.length === 0) {
      res.status(404).send("Sorry that type doesn't exist.")
    }
    res.json(typeArray)
  }

  if (year) {
    // "+" turns the string in to a number.
    const realeaseYearArray = netflixData.filter((item) => item.release_year === +year)
    if (realeaseYearArray.length === 0) {
      res.status(404).send("Sorry that year doesn't exist.")
    }
    res.json(realeaseYearArray)
  }
  res.json(netflixData)
})

// SECOND ENDPOINT 

// get a specific show based on id, using params 
// :id is like a placeholder different id:s that will show up in the url field in the browser 
app.get('/shows/:id', (req, res) => {
  const { id } = req.params
  // "+" turns the string in to a number.
  const showId = netflixData.find((show) => show.show_id === +id)

  if (!showId) {
    res.status(404).send("Show doesn't exist!")
  } else {
    res.json(showId)
  }
})

// Start the server
// passing port variable that we difined on line 18 
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})

// showing a specific year and all that won

// app.get("/year/:year", (req, res) => {
//  const { year } = req.params.year
//  const showWon = req.query.won

//  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

//  if (showWon) {
//    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
//  } else {
//    res.status(404).send("year not found")
//  }

//  res.json(nominationsFromYear)
// })

