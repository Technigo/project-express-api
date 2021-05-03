import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import avocadoSalesData from './data/avocado-sales.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 9000
const app = express()

const data = avocadoSalesData

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hi there')
})

// endpoint for all avocado sales data
app.get('/sales', (req, res) => {
  res.json(data)
})

app.get('/region/:region', (req, res) => {
  const { region } = req.params
  const destinationId = req.query.id
  let salesRegion = data.filter((item) => item.region === region)

  if (destinationId) {
    salesRegion = salesRegion.find(item => item.id === +destinationId)
  }
  res.json(salesRegion)
})

/* app.get('/:id', (req, res) => {
  const { id } = req.params
  const salesDestination = data.find(destination => destination.id === Number(id))
  res.json(salesDestination)
}) */

/* app.get('/region/:region/:id', (req, res) => {
  const { id } = req.params

  const salesDestination = data.find(destination => destination.id === +id)
  res.json(salesDestination)
})

app.get('/region/month/march', (req, res) => {
  const salesMonth = data.slice(data.date === '2015-03-01', data.date === '2015-03-31')
  console.log(salesMonth)
  res.json(salesMonth)
}) */

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
