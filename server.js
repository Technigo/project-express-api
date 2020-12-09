import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import data from './data/christmas_billboard.json'

import HarryData from './data/harry-potter-characters.json'

// Defines the port the app will run on. 
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Starting route
app.get('/', (request, response) => {
  response.send('Hello world')
})

// THIS END POINT WILL SHOW ALL THE DATA + FILTERING
app.get('/characters', (request, response) => {
  const { name } = request.query
  // filter by name (http://localhost:8080/characters?name=[insert name])
  if (name) {
    const filteredName = HarryData.filter(character => character.name === name)
    response.json(filteredName)
  } else {
    response.json(HarryData)
  }
})

// BY ALIVE/DEAD


// THIS END POINT WILL SHOW DATA FROM EACH HOUSE (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
app.get('/house/:house', (request, response) => {
  const { house } = request.params
  const showHouse = HarryData.filter((item) => item.house.toLocaleLowerCase() === house)
  response.json(showHouse)
})

//THIS END POINT WILL SHOW DATA FOR A UNIQUE ID
app.get('/id/:id', (request, response) => {
  const { id } = request.params
  const showId = HarryData.find((item) => item.id === +id)
  response.json(showId)
})





// THIS ENPOINT WILL ONLY SHOW DATA FROM THE TOP 20 SONGS
app.get('/songs/top-20', (request, response) => {
  const songsTopTen = data.filter((item) => item.week_position >= 1 && item.week_position <= 20)
  response.json(songsTopTen)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
