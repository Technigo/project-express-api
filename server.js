import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

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

// This endpoint shows all characters + will let you filter on name with query parameter
app.get('/characters', (request, response) => {
  const { name } = request.query
  const filteredName = harryData.filter(character => 
    character.name.toLocaleLowerCase() && 
    character.name.toLocaleLowerCase().includes(name))

  if (filteredName.length === 0) {
    response.status(404).json(ERROR_CHARACTERS_NOT_FOUND)
  } else {
    response.json(filteredName)
  }
})

// This endpoint shows one character from a unique id
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

// This enpoint shows all names of the characters, sorted from A-Z
app.get('/characters/names', (request, response) => {
  const names = harryData.map(name => name.name).sort()
  response.json(names)
})

// This endpoint shows all characters from a specific house
app.get('/characters/:house', (request, response) => {
  const { house } = request.params
  const houses = harryData.filter((item) => item.house.toLocaleLowerCase() === house)

  if (houses.length === 0) {
    response.status(404).json(ERROR_CHARACTERS_NOT_FOUND)
  } else {
    response.json(houses)
  }
})

// This endpoint shows different genders in a specific house
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
