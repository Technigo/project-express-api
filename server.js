import express from "express";
import cors from "cors";
import avocadoSalesData from "./data/avocado-sales.json";

const port = process.env.PORT || 8080;
const app = express();
// const  swaggerJsdoc = require("swagger-jsdoc");
const  swaggerJsdoc = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");

// middlewares to enable cors and json body parsing
app.use(cors()); 
app.use(express.json());
const listEndpoints = require('express-list-endpoints');

app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});
// swagger documentation

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc)
);
// All sales data
app.get('/sales', (request,response)=>{
  const {page = 1, limit = 10, minPrice = 0, maxPrice = 10 } = request.query;
  let salesData = avocadoSalesData;
  
  if (minPrice && maxPrice) {
    salesData = avocadoSalesData.filter((singleSale) => {
      return singleSale.averagePrice >= minPrice && singleSale.averagePrice <= maxPrice
    });
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = salesData.slice(startIndex, endIndex);
  
  if(salesData.length !== 0){
response.status(200).json({
     success: true,
      message: "OK",
      body: {
    data: results,
    totalPages: Math.ceil(salesData.length / limit),
    currentPage: parseInt(page),
    totalResults: salesData.length
      }
  });
  }else{
      response.status(404).json({
      success: false,
      message: "No data found",
      body: {}
    });
  }
  
})

// Single sales item
app.get('/sales/:id', (request,response)=>{
  const singleSales = avocadoSalesData.find((singleSale)=>singleSale.id === Number(request.params.id))
    if (singleSales) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        data: singleSales
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Single sales data not found",
      body: {}
    });
  }
})

// Top and bottom totalVolume sold
app.get('/sales/salesRanking/results', (request,response)=>{
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
        data: salesRanking
      }
    });
})

// Region
app.get('/sales/region/:region', (request,response)=>{
  const { date, page = 1, limit = 10, minPrice = 0, maxPrice = 10 } = request.query;
const selectedRegion = avocadoSalesData.filter((singleSale) => {
      return singleSale.region.toLowerCase() === decodeURIComponent(request.params.region).toLowerCase();
    });
let salesData=selectedRegion
    
  if (date) {
    salesData = salesData.filter((singleSale) => {
      return singleSale.date === date;
    });
  }
    else if (minPrice && maxPrice) {
    salesData = salesData.filter((singleSale) => {
      return Number(singleSale.averagePrice) >= Number(minPrice) && Number(singleSale.averagePrice) <= Number(maxPrice)
    });
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = salesData.slice(startIndex, endIndex);
      if(selectedRegion.length !== 0 ){
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        data: results,
        totalPages: Math.ceil(salesData.length / limit),
        currentPage: parseInt(page),
        totalResults: salesData.length
      }
    });
    }
     else {
    response.status(404).json({
      success: false,
      message: "This region doesn't exist!",
      body: {}
    });
  }
})

// Date
app.get('/sales/date/:date', (request,response)=>{
    const { region, page = 1, limit = 10, averagePrice, minPrice = 0, maxPrice = 10 } = request.query;
const selectedDate = avocadoSalesData.filter((singleSale) => {
      return singleSale.date === request.params.date;
    });
      let salesData=selectedDate
    
  if (region) {
    salesData = salesData.filter((singleSale) => {
      return singleSale.region === region;
    });
  }
    else if (minPrice && maxPrice) {
    salesData = salesData.filter((singleSale) => {
      return Number(singleSale.averagePrice) >= Number(minPrice) && Number(singleSale.averagePrice) <= Number(maxPrice)
    });
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = salesData.slice(startIndex, endIndex);
  
console.log(selectedDate)
    if(selectedDate.length !== 0 ){
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        data: results,
        totalPages: Math.ceil(salesData.length / limit),
        currentPage: parseInt(page),
        totalResults: salesData.length
      }
    });
    }
     else {
    response.status(404).json({
      success: false,
      message: "This date doesn't exist!",
      body: {}
    });
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
