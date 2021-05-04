import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


// Start defining your routes here

//Endpoint to get all the movies
app.get('/shows', (req, res) => {
  const { title } = req.query
  if (title) {
    const filteredTitleList = netflixData.filter(show => show.title.toString().includes(title))
    res.json(filteredTitleList)
  }
  res.json(netflixData)
})

//Endpoint to get one movie
app.get('/shows/:id', (req, res) => {
  const { id } = req.params
  const show = netflixData.find(show => show.show_id === +id)
  if (!show) {
    res.status(404).send(`No show with id number ${id} excists`)
  }
  res.json(show)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
