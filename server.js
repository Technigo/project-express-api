import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import avocadoSalesData from './data/avocado-sales.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('We are advocates of avocados. /avocados for full list. /id/:id for specific id, /regions/:region for specific region')
})

app.get('/avocados', (req, res) => {
  res.json(avocadoSalesData)
})

app.get('/avocados/id/:id', (request, response) => {
  const { id } = request.params
  const specificID = avocadoSalesData.find((avocado) => avocado.id === +id)
  response.json(specificID)
})

app.get('/avocados/regions/:region', (request, response) => {
  const { region } = request.params

  let specificRegion = avocadoSalesData.filter((avocado) => avocado.region === region)
  response.json(specificRegion)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
