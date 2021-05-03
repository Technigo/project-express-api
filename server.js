import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import plantsData from './data/plants.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 9002
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// endpoint to get all power plants including possibility to filter on country
app.get('/nuclear-power-plants', (request, response) => {
  const { country } = request.query
  if (country) {
    const byCountry = plantsData.filter(plant => plant.Country.includes(country))
    response.json(byCountry)
  }
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
// app.get('/nuclear-power-plants/countries/:country', (request, response) => {
//   const country = request.params.country
//   const plantsByCountry = plantsData.filter(plant => plant.Country === country)
//   if (plantsByCountry == []) {
//     response.status(404).send(`There is no country named ${country} in the data! Either the country you inserted has no nuclear plants or you might have written it in a way that doesn't match the name in the dataset. See this link for a list of the countries oncluded in the dataset.`)
//   }
//   response.json(plantsByCountry)
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
