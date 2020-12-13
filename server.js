// The main go-to for starting APIs in JS, in Node. Really handy, mature tool for handling JS in back-end. 
// Type npm run dev to start
import express, { request, response } from "express"
const nominees = require('./data/golden-globes.json')
// This variable will allow us to create a server, which is a program that allows us to listen to incoming transmissions on a port. 65,000 ports on the computer.
const app = express()
const port = process.env.PORT || 8080;

// 🔵 Root endpoint.
app.get('/', (request, response) => {
  // For every endpoint you have, you have to send a response at some point. 
  response.send("Hello (golden) globe!")
})

// 🔵 Endpoint that lists all the nominees (since 2010 – that's when the data starts).
app.get('/nominees', (request, response) => {
  response.send(nominees)
})

// 🔵 Endpoint that lists all nominees for a search value – either actor or movie/series title (the 'nominee' field).
// 🟠 Example URL: /nominees/search?search=leo
app.get('/nominees/search', (request, response) => {
  const search = request.query.search
  // "search" is the variable with the value that's being searched for.
  let filteredNominees = nominees.filter(
    item => item.nominee.toLowerCase().includes(search.toLowerCase())
  )
  if (filteredNominees.length === 0) {
    response.status(404).json(`We searched around the Globe, but found no matches for '${search}'.`)
  } else {
    response.send(filteredNominees)
  }
})

// 🔵 Endpoint that lists all the Golden Globe wins.
app.get('/nominees/winners', (request, response) => {
  const filteredNominees = nominees.filter(nominee => nominee.win === true)
  response.send(filteredNominees)
})

// 🔵 Endpoint that lists all nominees for a year (Golden globe year, not release year).
// 🟠 Example URL: /nominees/2014
app.get('/nominees/:year', (request, response) => {
  const { year } = request.params
  const filteredNominees = nominees.filter(nominee => nominee.year_award === +year)
  // Handle year out of range
  if (filteredNominees.length === 0) {
    response.status(404).json(`There's no data for the year ${year}. Please enter a year between 2010–2020`)
  } else {
    response.send(filteredNominees)
  }
})

// 🔵 Endpoint that lists all winners for a year.
// 🟠 Example URL: /nominees/2014/winners
app.get('/nominees/:year/winners', (request, response) => {
  const { year } = request.params
  let filteredNominees = nominees.filter(nominee => nominee.year_award === +year)
  filteredNominees = filteredNominees.filter(nominee => nominee.win === true)
  
  // Handle year out of range
  if (filteredNominees.length === 0) {
    response.status(404).json(`There's no data for the year ${year}. Please enter a year between 2010–2020`)
  } else {
    response.send(filteredNominees)
  }
})

// 🔵 Endpoint that lists all nominees for a category.
// 🟠 Example URL: /nominees/categories/Best%20Motion%20Picture%20-%20Drama
app.get('/nominees/categories/:category', (request, response) => {
  const { category } = request.params
  let filteredNominees = nominees.filter(nominee => nominee.category === category)

  // Category not found.
  if (filteredNominees.length === 0) {
    response.status(404).json(`We couldn't find a category called ${category}`)
  } else {
    response.send(filteredNominees)
  }
})

// 🔵 Endpoint that lists all the winners for a category.
// 🟠 Example URL: /nominees/categories/Best%20Motion%20Picture%20-%20Drama/winners
app.get('/nominees/categories/:category/winners', (request, response) => {
  const { category } = request.params
  let filteredNominees = nominees.filter(nominee => nominee.category === category)
  filteredNominees = filteredNominees.filter(nominee => nominee.win === true)
  
  // Category not found.
  if (filteredNominees.length === 0) {
    response.status(404).json(`We couldn't find a category called ${category}`)
  } else {
    response.send(filteredNominees)
  }
})

// 🔵 Endpoint that lists the winner of a category for a given year.
// 🟠 Example URL: /nominees/Best%20Motion%20Picture%20-%20Drama/2013/winner
app.get('/nominees/:category/:year/winner', (request, response) => {
  const { category, year } = request.params
  // Filter by category
  let filteredNominees = nominees.filter(nominee => nominee.category === category)
  // Filter by year
  filteredNominees = filteredNominees.filter(nominee => nominee.year_award === +year)
  // Filter by win
  filteredNominees = filteredNominees.filter(nominee => nominee.win === true)
  response.send(filteredNominees)
})

// Gives it a port and a function. Listen on port 8080, and the function is "what should I do when it starts?"
app.listen(port, () => {
  console.log(`Hello console, the server is up and running on port ${port}.`)
})
