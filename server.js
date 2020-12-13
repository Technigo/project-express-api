import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import c19 from './data/covid19.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Starts server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// Route definition
app.get('/', (req, res) => {
  res.seres.send('This API is a coding project by Peggy @blipsandclicks made during Technigo bootcamp 2020 Fall session for educational purposes only. Please do not use this API, instead refer to the original data source which is the COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University: https://github.com/CSSEGISandData/COVID-19')
})

// Route for entire array
app.get('/all', (req, res) => {
  res.json(c19)
})

// Route to get data for a specific Type and location
// Returns a single item from the array
app.get('/all/:id', (req,res) => {
  const id = req.params.id
  let byID = c19.filter((item) => item.id === id)
  res.json(byID)
})

// Route to get data by country
// Returns all 3 types of data for each country and any province defined for country
app.get('/countries/:country', (req, res) => {
  const country = req.params.country
  let byCountry = c19.filter((item) => item.country === country)
  res.json(byCountry)
})

// Route to get data by Type: total Cases, Deaths, or Recovered
// Route can also be filtered by either Region or Country
app.get('/types/:type', (req,res) => {
  const type = req.params.type
  let byType = c19.filter((item) => item.type === type)

  const region = req.query.region
  if (region) {
    byType = byType.filter((item) => item.region === region)
  }

  const country = req.query.country
  if (country) {
    byType = byType.filter((item) => item.country === country)
  }
  res.json(byType)
})
