import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import plantsData from './data/plants.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8999
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// endpoint to get all power plants
app.get('/nuclear-power-plants', (request, response) => {
  response.json(plantsData)
})
//endpoint to get power plant by id
app.get('/nuclear-power-plants/:id', (request, response) => {
  const { id } = request.params
  const plantById = plantsData.find (plant => plant.FID === +id)
  if (!plantById) {
    response.status(404).send(`There is no nuclear power plant with id number ${id} in the data!`)
  }
  response.json(plantById)
})
//endpoint to get power plant by country
app.get('/nuclear-power-plants/countries/:country', (request, response) => {
  const country = request.params.country
  const plantsByCountry = plantsData.filter(plant => plant.Country === country)
  response.json(plantsByCountry)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
