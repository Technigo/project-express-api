import express from "express"
import cors from "cors"
import avocadoSalesData from "./data/avocado-sales.json"
import listEndpoints from "express-list-endpoints"

const app = express()
const port = 3000

app.use(cors())

function getTopSales() {
  const sortedSales = avocadoSalesData.sort(
    (a, b) => b.totalBagsSold - a.totalBagsSold
  )
  return sortedSales
}

function getSalesByDate() {
  const salesWithDateObjects = avocadoSalesData.map((sale) => ({
    ...sale,
    date: new Date(sale.date),
  }))

  const sortedSales = salesWithDateObjects.sort((a, b) => b.date - a.date)

  const formattedSales = sortedSales.map((sale) => ({
    ...sale,
    date: sale.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }))

  return formattedSales
}

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json(endpoints)
})

app.get("/sales", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  let filteredSales = avocadoSalesData.slice(startIndex, endIndex)

  if (req.query.region) {
    filteredSales = filteredSales.filter(
      (sale) => sale.region.toLowerCase() === req.query.region.toLowerCase()
    )
  }

  if (req.query.date) {
    const filterDate = new Date(req.query.date)
    filteredSales = filteredSales.filter(
      (sale) => new Date(sale.date) >= filterDate
    )
  }

  const totalPages = Math.ceil(avocadoSalesData.length / limit)

  const nextPage =
    page < totalPages
      ? `http://localhost:3000/sales?page=${page + 1}&limit=${limit}`
      : null

  res.json({
    sales: filteredSales,
    currentPage: page,
    totalPages: totalPages,
    nextPage: nextPage,
  })
})

app.get("/regions", (req, res) => {
  const regions = [...new Set(avocadoSalesData.map((sale) => sale.region))]
  res.json(regions)
})

app.get("/sales/regions/:region", (req, res) => {
  const region = req.params.region
  const salesInRegion = avocadoSalesData.filter(
    (sale) => sale.region === region
  )
  res.json(salesInRegion)
})

app.get("/sales/topBagsSold", (req, res) => {
  const topSales = avocadoSalesData
    .sort((a, b) => b.totalBagsSold - a.totalBagsSold)
    .slice(0, 5)
  res.json(topSales)
})

app.get("/sales/mostExpensive", (req, res) => {
  const salesByRegion = {}

  avocadoSalesData.forEach((sale) => {
    if (
      !salesByRegion[sale.region] ||
      salesByRegion[sale.region].averagePrice < sale.averagePrice
    ) {
      salesByRegion[sale.region] = sale
    }
  })

  const mostExpensive = Object.values(salesByRegion)
    .sort((a, b) => b.averagePrice - a.averagePrice)
    .slice(0, 5)

  res.json(mostExpensive)
})

app.get("/sales/cheapest", (req, res) => {
  const cheapestSales = avocadoSalesData
    .sort((a, b) => a.averagePrice - b.averagePrice)
    .slice(0, 5)
  res.json(cheapestSales)
})

app.get("/sales/latest", (req, res) => {
  const latestSales = getSalesByDate()
  res.json(latestSales)
})

app.get("/sales/filtered", (req, res) => {
  const hasQueryParams = Object.keys(req.query).length > 0

  if (!hasQueryParams) {
    res.json({
      message: "Welcome to the /sales/filtered endpoint!",
      usage: {
        description:
          "This endpoint allows you to filter sales data. You can use the following query parameters:",
        parameters: {
          region: "Filter sales by region. Example: ?region=Albany",
          startDate:
            "Filter sales by start date. Example: ?startDate=2015-01-01",
          endDate: "Filter sales by end date. Example: ?endDate=2015-12-31",
          combined:
            "You can combine parameters for more specific results. Example: ?region=Albany&startDate=2015-01-01&endDate=2015-12-31",
        },
        examples: {
          filterByRegion: "http://localhost:3000/sales/filtered?region=Albany",
          filterByDateRange:
            "http://localhost:3000/sales/filtered?startDate=2015-01-01&endDate=2015-12-31",
          combinedFilter:
            "http://localhost:3000/sales/filtered?region=Albany&startDate=2015-01-01&endDate=2015-12-31",
        },
      },
    })
  } else {
    const region = req.query.region ? req.query.region.toLowerCase() : null
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null
    const filteredSales = avocadoSalesData.filter((sale) => {
      const saleDate = new Date(sale.date)
      return (
        (region ? sale.region.toLowerCase() === region : true) &&
        (!startDate || saleDate >= startDate) &&
        (!endDate || saleDate <= endDate)
      )
    })
    res.json(filteredSales)
  }
})

app.get("/sales/summary", (req, res) => {
  const totalSales = avocadoSalesData.length
  const totalBagsSold = avocadoSalesData.reduce(
    (total, sale) => total + sale.totalBagsSold,
    0
  )
  const averagePricePerBag =
    avocadoSalesData.reduce((total, sale) => total + sale.averagePrice, 0) /
    avocadoSalesData.length

  const salesByRegion = avocadoSalesData.reduce((acc, sale) => {
    if (!acc[sale.region]) {
      acc[sale.region] = 0
    }
    acc[sale.region] += sale.totalBagsSold
    return acc
  }, {})

  const topRegions = Object.entries(salesByRegion)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([region, sales]) => ({ region, sales }))

  res.json({
    message: "Summary of sales",
    totalSales: totalSales,
    totalBagsSold: totalBagsSold,
    averagePricePerBag: averagePricePerBag.toFixed(2),
    salesByRegion: salesByRegion,
    topRegions: topRegions,
  })
})

app.get("/sales/futureFeature", (req, res) => {
  res.json({
    message: "This endpoint will be used for a future feature.",
  })
})

app.get("/sales/:id", (req, res) => {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    res.status(400).json({
      error: true,
      message: "Invalid request",
      details: "Please provide a valid ID. Example: /sales/1",
    })
    return
  }

  const sale = avocadoSalesData.find((sale) => sale.id === id)

  if (sale) {
    res.json(sale)
  } else {
    res.status(404).json({
      error: true,
      message: "Sale not found",
      details: `No sale found with the ID: ${id}`,
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
