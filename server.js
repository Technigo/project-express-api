import express from "express";
import cors from "cors";

import avocadoSalesData from "./data/avocado-sales.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;

const listEndpoints = require("express-list-endpoints")
const app = require('express')();
// const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/avocado-sales", (req, res) => {
  res.json(avocadoSalesData)
})

// Defines a route to the entire data set of avocado sales
app.get("/avocado-sales/top-20", (req, res) => {
  // Sorts the array to get the top 20 sales, based on the total volume
  const topSales = avocadoSalesData.sort((a, b) => b.totalVolume - a.totalVolume).slice(0, 20); // Slices the array to get the first 20 items 
  res.json(topSales); // Return a JSON response with the top 100 avocado sales
})

// Defines a route for each individual avocado sale
app.get("/avocado-sales/id/:id", (req, res) => {
  const id = req.params.id; // Gets the id from the URL
  const avocadoId = avocadoSalesData.find((avocadoSale) => avocadoSale.id === +id); // Finds and checks if the id of the URL matches the id of the avocado sale, if it does, return that avocado sale. The + sign converts the id to a number, since the id in the data set is a number but the id in the URL is a string
  res.json(avocadoId);
})

// Defines a route for each region
app.get("/avocado-sales/region/:region", (req, res) => {
  const region = req.params.region.toLowerCase(); // Gets the region from the URL and converts it to lowercase to make the search case insensitive
  const salesRegion = avocadoSalesData.filter((avocadoSale) => avocadoSale.region.toLowerCase() === region); // Filter the array to get the avocado sales for the region, and convert the region to lowercase to make the search case insensitive
  const totalVolume = salesRegion.reduce((sum, sale) => sum + sale.totalVolume, 0); // Iterates over each "avocado sale", and adds the total volume of each sale to the sum, starting at 0
  const totalBagsSold = salesRegion.reduce((sum, sale) => sum + sale.totalBagsSold, 0); // Iterates over each "avocado sale", and adds the total bags sold of each sale to the sum, starting at 0

  // Error handling and hint for the user
  if (salesRegion.length === 0) {
    return res.status(404).json({ error: "Please change the placeholder search param for a region of your choice" });
  }

  res.json({
    region: region, // Returns the region-name
    regionalTotalVolume: totalVolume, // Returns the total volume for the region
    regionalTotalBagsSold: totalBagsSold, // Returns the total bags sold for the region
    salesRegion // Returns the array of avocado sales for the region
  });
})

// Defines a route for average price for each region
app.get("/avocado-sales/average-price/:region", (req, res) => {
  const region = req.params.region.toLowerCase(); // Gets the region from the URL and converts it to lowercase to make the search case insensitive
  const salesInRegion = avocadoSalesData.filter((avocadoSale) => avocadoSale.region.toLowerCase() === region); // Filter the array to get the avocado sales for the region, and convert the region to lowercase to make the search case insensitive
  const totalAveragePrice = salesInRegion.reduce((sum, sale) => sum + sale.averagePrice, 0); // Iterates over each "avocado sale", and adds the average price of each sale to the sum, starting at 0
  const averagePrice = totalAveragePrice / salesInRegion.length; // Calculates the average price for the region, byt dividing the totalAveragePrice by the length of the array

  // Error handling and hint for the user
  if (salesInRegion.length === 0) {
    return res.status(404).json({ error: "Please change the placeholder search param for a region of your choice" });
  }

  res.json({
    region: region,
    averagePrice: averagePrice
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});