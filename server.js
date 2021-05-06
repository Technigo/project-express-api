import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import avocadoSalesData from './data/avocado-sales.json'

const port = process.env.PORT || 8080
const app = express()
// Add middleware to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// _ acts as a placeholder for req 
app.get('/', (_, res) => {
  res.send(listEndpoints(app));
})

// Endpoint 1: All Data
app.get('/avo-sales', (_, res) => {
  res.send(avocadoSalesData);
})

// Endpoint 2: Avo sales by location 

app.get('/avo-sales/regions', (req, res) => {
  // Step 1 add Map method to create array of regions 
  const allRegions = avocadoSalesData.map((avocadoSalesData) => { return avocadoSalesData.region })
  // Step 2 Detect if location occurs more than one time (const reduced regions )
  // forEach let location = "" 
  // Google: detect multiple occurrences of the same array element 
  res.send(allRegions);
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
