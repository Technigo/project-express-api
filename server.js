import express from 'express'
import cors from 'cors'

import avocados from './data/avocado-sales.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/sales', (req, res) => {
  const { region } = req.query
  const { priceBelow } = req.query
  const { priceAbove } = req.query
  const { month } = req.query

  let filteredSales = avocados
  if (region) {
    filteredSales = filteredSales.filter((sale) => {
      const regionLowerCase = sale.region.toLowerCase()
      return regionLowerCase.includes(region.toLowerCase())
    })
  }
  if (priceBelow) {
    filteredSales = filteredSales.filter((sale) => sale.averagePrice < +priceBelow)
  }
  if (priceAbove) {
    filteredSales = filteredSales.filter((sale) => sale.averagePrice < +priceAbove)
  }
  if (month) {
    filteredSales = filteredSales.filter((sale) => {
      const date = (new Date(sale.date)).toLocaleDateString("en", { month: "long" }).toLowerCase()
      return date === month.toLowerCase()
    })
  }

  res.json(filteredSales)
})

app.get('/sales/:id', (req, res) => {
  const { id } = req.params
  let filteredSales = avocados
  if (id) {
    filteredSales = filteredSales.find((sale) => {
      return sale.id === +id
    })
    res.json(filteredSales)
  } else {
    res.status(404).json({ message: "Not founds" })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
