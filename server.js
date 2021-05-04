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

// endpoint with params for sales in a whole region and query string to get the sales for one date in one region 
app.get('/region/:region', (req, res) => {
  const { region } = req.params
  const salesId = req.query.id
  let salesRegion = data.filter((item) => item.region.toLowerCase() === region.toLowerCase())

  if (salesId) {
    salesRegion = salesRegion.find(item => item.id === +salesId)
  }
  res.json(salesRegion)
})

/* app.get('/price', (req, res) => {
  const averageSalesPrice = req.query.asp
  
  if(averageSalesPrice) {
    data = data.filter((item) => item.averagePrice === +averageSalesPrice)
    console.log(averageSalesPrice)
  }
  res.json(data)
}) */

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
