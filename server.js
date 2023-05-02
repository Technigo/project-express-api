import express from "express";
import cors from "cors";
import avocadoSalesData from "./data/avocado-sales.json";

const port = process.env.PORT || 8080;
const app = express();

// middlewares to enable cors and json body parsing
app.use(cors()); 
app.use(express.json());
const listEndpoints = require('express-list-endpoints');

app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});
// All sales data
app.get('/sales', (request,response)=>{
  const { region, date, page = 1, limit = 10, averagePrice, minPrice = 0, maxPrice = 10 } = request.query;
  let salesData = avocadoSalesData;
  
  if (region) {
    salesData = avocadoSalesData.filter((singleSale) => {
      return singleSale.region === region;
    });
  } else if (date) {
    salesData = avocadoSalesData.filter((singleSale) => {
      return singleSale.date === date;
    });
  }
    else if (averagePrice && minPrice && maxPrice) {
    salesData = avocadoSalesData.filter((singleSale) => {
      return singleSale.averagePrice >= minPrice && singleSale.averagePrice <= maxPrice
    });
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = salesData.slice(startIndex, endIndex);
  
  response.json({
    results: results,
    totalPages: Math.ceil(salesData.length / limit),
    currentPage: parseInt(page),
    totalResults: salesData.length
  });
})

// Single sales item
app.get('/sales/:id', (request,response)=>{
  const singleSales = avocadoSalesData.find((singleSale)=>singleSale.id === Number(request.params.id))
    if (singleSales) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        singleSales: singleSales
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Single sale not found",
      body: {}
    });
  }
})

// Top and bottom totalVolume sold
app.get('/salesRank', (request,response)=>{
 const maxSale = avocadoSalesData.reduce((prev, current) => {
    return prev.totalVolume > current.totalVolume ? prev : current;
  });
   const minSale = avocadoSalesData.reduce((prev, current) => {
    return prev.totalVolume < current.totalVolume ? prev : current;
  });
  const salesRanking = [maxSale, minSale]
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        salesRanking: salesRanking
      }
    });
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
