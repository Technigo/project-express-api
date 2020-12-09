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
  res.send('We are advocates of avocados')
})

app.get('/avocados', (req, res) => {
  res.json(avocadoSalesData)
})

app.get('/avocados/:id', (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const user = avocadoSalesData.find((avocado) => avocado.id === +id);
  response.json(user);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
