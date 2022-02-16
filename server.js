import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"

import avocadoSalesData from "./data/avocado-sales.json"

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Main route
app.get("/", (req, res) => {
  res.send("Go to /endpoints to see all the routes")
})

// Get the list of endpoints
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
})

// Get the list of avocado sales
app.get("/avocadosales", (req, res) => {
  res.json(avocadoSalesData)
})

// Sort by lowest average price
app.get("/avocadosales/lowestaverageprice", (req, res) => {
  const ascendingAveragePrice = avocadoSalesData.sort((a, b) => {
    return a.averagePrice - b.averagePrice
  })

  res.json(ascendingAveragePrice)
})

// Sort by highest average price
app.get("/avocadosales/highestaverageprice", (req, res) => {
  const descendingAveragePrice = avocadoSalesData.sort((a, b) => {
    return b.averagePrice - a.averagePrice
  })

  res.json(descendingAveragePrice)
})

// Get avocado sales based on region, using path param
app.get("/avocadosales/region/:region", (req, res) => {
  const { region } = req.params

  const saleByRegion = avocadoSalesData.filter(
    (sale) => sale.region.toLowerCase().indexOf(region.toLowerCase()) !== -1
  )

  if (saleByRegion.length > 0) {
    res.status(200).json({
      response: saleByRegion,
      success: true,
    })
  } else {
    res.status(404).json({
      response: "No sale found for that region",
      success: false,
    })
  }
})

// Get avocado sales based on date, using path param
app.get("/avocadosales/date/:date", (req, res) => {
  const { date } = req.params

  const saleByDate = avocadoSalesData.filter(
    (sale) => sale.date.indexOf(date) !== -1
  )

  if (saleByDate.length > 0) {
    res.status(200).json({
      response: saleByDate,
      success: true,
    })
  } else {
    res.status(404).json({
      response: "No sale found for that date",
      success: false,
    })
  }
})

// Get a specific avocado sale based on id, using path param
app.get("/avocadosales/id/:id", (req, res) => {
  const { id } = req.params

  const saleId = avocadoSalesData.find((sale) => sale.id === +id)

  if (!saleId) {
    res.status(404).send("No sale found with that id")
  } else {
    res.json(saleId)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
