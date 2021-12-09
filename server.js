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

// Defining routes here
// this is an endpoint 
app.get('/', (req, res) => {
  res.send({
    title: "Welcome to DL:s shows API!",
    description: {
      endpoint1: {
        "Returns the entire shows array": "https://dls-shows-api.herokuapp.com/shows",
        "Returns shows by a specific title, replace text inside <> with your text": "/shows?title=<title>",
        "Returns shows by a specific country, replace text inside <> with your text": "/shows?country=<country>",
        "Returns shows by a specific type (tv shows or movies), replace text inside <> with your text": "/shows?type=<type>",
        "Returns shows by a specific year, replace text inside <> with your text": "/shows?year=<year here>",
        "Set limit and page of a response, replace text inside <> with your text": "/shows?page=<page number>&limit=<limit number>"
      },
      endpoint2: {
        "This endpoint returns shows with a specific id. Replace :id with a number of the show.": "https://dls-shows-api.herokuapp.com/shows/id/:id"
      }
    }
  })
})

// NOTES ABOUT QUERY & PARAMS
// different between params and query is that params are mandatory 
// if you create an endpoint that takes params , you have to include that 
// param in your endpoint. Otherwise it's not going to trigger that endpoint.
// Query params are optional, you can include them, but you dont have to
// the endpint is going to work with or without query in end point path

// path params uses when you want only send one object from the data
// query params uses when you about filtering a data and send back multiple amount, 
// just a smaller array of the records 

// FIRST ENDPOINT 
// call back function inside of get() communicates with fronted via those two argument(req and res)
// res = is what we send back to the frontend 
// req = it's handaling send to the backend like a specific query for ex 
app.get('/shows', (req, res) => {
  // req is an object with properties such as query and params, 
  // both query and params are an empty object from the begging 
  // every query parameter consist of two part, key and value, like an object
  const { title, country, type, year, page, limit } = req.query

  // creating this variable, because we will always return the same array to the user
  // note to me: it is my a currentQuestion variable from previous project?
  let arrayToSendToUser = netflixData
  let queryFromUser = title

  // can i combine title, country and type into one if?
  if (title) {
    /* toLowerCase() sets the data in type array data to lowercase, 
    then includes() returns true if a string contains type from url, 
    includes() is almost the same as indexOf(), indecOf return number, when includes a boolean, 
    a part of the string that we send should be in the database */
    arrayToSendToUser = arrayToSendToUser.filter(
      (item) => item.title.toLowerCase().includes(title.toLowerCase()) 
    )
  }

  if (country) {
    arrayToSendToUser = arrayToSendToUser.filter(
      (item) => item.country.toLowerCase().includes(country.toLowerCase()) 
    )
    queryFromUser = country
  }
 
  if (type) {
    arrayToSendToUser = arrayToSendToUser.filter(
      (item) => item.type.toLowerCase().includes(type.toLowerCase()) 
    )
    queryFromUser = type
  }

  if (year) {
    // "+" turns the string in to a number.
    arrayToSendToUser = arrayToSendToUser.filter((item) => item.release_year === +year)
    queryFromUser = year
  }

  // PAGINATION
  // with limit user setting the limit of items to show per page 
  // and page shows first items depends on what limit is
  if (page && limit) {
    // -1 because index starts with 0, multiply 0 so we start at 0
    const startIndex = (page - 1) * limit
    // here we get the end of an array
    const endIndex = page * limit 
    // slice gives us what in between startIndex and endIndex
    const paginationArray = arrayToSendToUser.slice(startIndex, endIndex)
    // returs an array with pagination
    res.json(paginationArray)
  }

  // ERRORS
  if (arrayToSendToUser.length === 0) {
    res.status(404).send(`Sorry, ${queryFromUser} doesn't exist.`)
  }

  res.json({
    response: arrayToSendToUser,
    success: true
  });
});

// SECOND ENDPOINT 
// get a specific show based on id, using params 
// :id is like a placeholder different id:s that will show up in the url field in the browser 
app.get('/shows/id/:id', (req, res) => {
  // params in this case are :id, params is something that we can get from the request 
  // all params comes as strings 
  const { id } = req.params
  // "+" turns the string in to a number.
  const showOnlyOneShow = netflixData.find((show) => show.show_id === +id)

  if (!showOnlyOneShow) {
    res.status(404).json({
      response: "No show found with that id",
      // boolean property, 
      success: false
    })
  } else {
    // status 200 is by default 
    res.json({
      response: showOnlyOneShow,
      success: true
    })
  }
})

// Start the server
// passing port variable that we difined on line 18 
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
