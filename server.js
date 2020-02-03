import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import sales from './data/avocado-sales.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('', (req, res) => {
  res.end('Learn about avocado sales. Jeeiij')
})

// /sales - all sales everywhere
// /sales?totalBagsSoldMoreThan=1234 - all sales with more than 1234 sold bags
app.get('/sales', (req, res) => {
  const totalBagsSoldMoreThan = req.query.totalBagsSoldMoreThan
  if (totalBagsSoldMoreThan) {
    const matchingSales = sales.filter(
      (sale) => sale.totalBagsSold >= totalBagsSoldMoreThan
    )
    res.json(matchingSales)
  } else {
    res.json(sales)
  }
})

// average price, sorted from low to high
app.get('/salesByAveragePrice', (req, res) => {
  res.json(sales.sort((a, b) => a.averagePrice - b.averagePrice))
})
//combine this route with the sales route if there is time

// /sales/5 - sale with id 5 in every region
app.get('/sales/:id', (req, res) => {
  const id = req.params.id
  const saleIdInAllRegions = sales.find((sale) => sale.id === +id)
  res.json(saleIdInAllRegions)
})

// /Albany/sales - all sales in Albany
app.get('/:region/sales', (req, res) => {
  const region = req.params.region
  const salesInRegion = sales.filter(
    (sale) => sale.region.toLowerCase() === region.toLowerCase()
  )
  res.json(salesInRegion)
})

// /Albany/sales/5 -  sale with id 5 in a specific region
app.get('/:region/sales/:id', (req, res) => {
  const region = req.params.region
  const id = req.params.id
  let specificSale = sales.filter(
    (sale) => sale.region.toLowerCase() === region.toLowerCase()
  )

  if (specificSale) {
    specificSale = specificSale.find((sale) => sale.id === +id)
  }

  res.json(specificSale)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
