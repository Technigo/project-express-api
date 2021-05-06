import express, { query } from 'express'
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

// Endpoint 2: Avo sales regions
app.get('/avo-sales/regions', (req, res) => {
  const reducedRegions = []
  const regions = avocadoSalesData.map((avocadoSalesData) => { return avocadoSalesData.region })
  for (const region of regions) {
    if (!reducedRegions.includes(region)) {
      reducedRegions.push(region)
    }
  }
  res.send(reducedRegions)
})

app.get('/avo-sales/:id', (req, res) => {
  const { id } = req.params
  const avoId = avocadoSalesData.find((id) => avocadoSalesData.id === +id)
  if (avoId) {
    res.status(200).json({ data: avoId });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
  res.json(avoId);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
