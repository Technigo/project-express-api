import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import data from './data/christmas_billboard.json'

import harryData from './data/harry-potter-characters.json'

const ERROR_CHARACTERS_NOT_FOUND = {error : 'No character results were found, please try again.'}

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

// THIS END POINT WILL SHOW ALL THE DATA + FILTERING ON NAME AVAILABLE
app.get('/characters', (request, response) => {
  const { name } = request.query
  if (name) {
    const filteredName = harryData.filter(character => character.name.toLocaleLowerCase() === name)
    response.json(filteredName)
  } else {
    response.json(harryData)
  }
})

// ALIVE/DEAD
// MALE/FEMALE


// THIS END POINT WILL SHOW DATA FOR A UNIQUE ID
app.get('/characters/id/:id', (request, response) => {
  const { id } = request.params
  const showId = harryData.find((item) => item.id === +id)
  // Include error response here
  if (!showId) {
    response.status(404).json(ERROR_CHARACTERS_NOT_FOUND)
  } else {
    response.json(showId)
  }
})

// This enpoint will show all names of the characters, sorted from A-Z
app.get('/characters/names', (request, response) => {
  const names = harryData.map(name => name.name).sort()
  response.json(names)
})

// THIS END POINT WILL SHOW DATA FROM EACH HOUSE (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
app.get('/characters/:house', (request, response) => {
  const { house } = request.params
  const showHouse = harryData.filter((item) => item.house.toLocaleLowerCase() === house)

  if (showHouse.length === 0) {
    response.status(404).json(ERROR_CHARACTERS_NOT_FOUND)
  } else {
    response.json(showHouse)
  }
})

// END POINT TO SHOW DIFFERENT GENDERS IN EACH HOUSE
app.get('/characters/:house/genders/:gender', (request, response) => {
  const { house, gender } = request.params
  const genders = harryData.filter(character => 
    character.house.toLocaleLowerCase() === house && 
    character.gender.toLocaleLowerCase() === gender 
  )

  if (genders.length === 0) {
    response.status(404).json(ERROR_CHARACTERS_NOT_FOUND)
  } else {
    response.json(genders)
  }
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
