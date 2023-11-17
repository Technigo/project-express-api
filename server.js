import express from "express";
import cors from "cors";

import avocadoSalesData from "./data/avocado-sales.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080;

const listEndpoints = require("express-list-endpoints")
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// ----------- Routes and queries ----------- // 
// Defines a route to the root of the API, which returns a list of all possible routes
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Defines a route to the entire data set of avocado sales
app.get("/avocado-sales", (req, res) => {
  res.json(avocadoSalesData);

  if (!avocadoSalesData) {
    res.status(404).json({ error: "No avocado sales where found" })
  }
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

  if (avocadoId) {
    res.json(avocadoId)
  } else {
    res.status(404).json({ error: `No avocado sale with id ${id} found` }) // For example http://localhost:8080/avocado-sales/id/4566456 
  }
})

// Defines a query param for each region, also displays the total volume and total bags sold for the region
app.get("/avocado-sales/region", (req, res) => {
  const queryRegion = req.query.region; // Gets the region from the query parameter

  // Error handling if the user doesn't provide a query parameter
  // If the url is wrong: http://localhost:8080/avocado-sales/region
  if (!queryRegion) {
    return res.status(400).json({ error: "Please provide a 'region' query parameter. The url is to be written in the following way: avocado-sales/region?region=regionName" });
  }

  const region = queryRegion.toLowerCase(); // Converts the region to lowercase to make the search case insensitive
  const salesRegion = avocadoSalesData.filter((avocadoSale) => avocadoSale.region.toLowerCase() === region);// Filter the array to get the avocado sales for the region, and convert the region to lowercase to make the search case insensitive
  const totalVolume = salesRegion.reduce((sum, sale) => sum + sale.totalVolume, 0); // Iterates over each "avocado sale", and adds the total volume of each sale to the sum, starting at 0
  const totalBagsSold = salesRegion.reduce((sum, sale) => sum + sale.totalBagsSold, 0); // Iterates over each "avocado sale", and adds the total bags sold of each sale to the sum, starting at 0

  // Create an array of all possible regions for showing them to the user. Set lets me create an array of unique values, so I don't get duplicates in the new array of allRegions
  const allRegions = [...new Set(avocadoSalesData.map((avocadoSale) => avocadoSale.region))];

  // Error handling and hint for the user
  // If for example the user tries to search for Vermont: http://localhost:8080/avocado-sales/region?region=Vermont
  if (salesRegion.length === 0) {
    return res.status(404).json({ error: `${queryRegion} isn't in the list of possible regions. Possible regions are: ${allRegions.join(", ")}` });
  }

  res.json({
    region: queryRegion, // Returns the region-name
    regionalTotalVolume: totalVolume, // Returns the total volume for the region
    regionalTotalBagsSold: totalBagsSold, // Returns the total bags sold for the region
    salesRegion // Returns the array of avocado sales for the region
  });
})

// Defines a query for average price for each region
app.get("/avocado-sales/average-price", (req, res) => {
  const queryRegion = req.query.avgPrice; // Gets the region from the query parameter

  // Error handling if the user doesn't provide a query parameter
  // If the url is wrong: http://localhost:8080/avocado-sales/average-price
  if (!queryRegion) {
    return res.status(400).json({ error: "Please provide an 'avgPrice' query parameter. The url is to be written in the following way: avocado-sales/average-price?avgPrice=regionName" });
  }

  const region = queryRegion.toLowerCase(); // Converts the region to lowercase to make the search case insensitive
  const salesInRegion = avocadoSalesData.filter((avocadoSale) => avocadoSale.region.toLowerCase() === region); // Filter the array to get the avocado sales for the region, and convert the region to lowercase to make the search case insensitive
  const totalAveragePrice = salesInRegion.reduce((sum, sale) => sum + sale.averagePrice, 0); // Iterates over each "avocado sale", and adds the average price of each sale to the sum, starting at 0
  const averagePrice = totalAveragePrice / salesInRegion.length; // Calculates the average price for the region, byt dividing the totalAveragePrice by the length of the array

  // Create an array of all possible regions
  const allRegions = [...new Set(avocadoSalesData.map((avocadoSale) => avocadoSale.region))];


  // Error handling and hint for the user
  // If for example the user tries to search for Vermont: http://localhost:8080/avocado-sales/average-price?avgPrice=Vermont
  if (salesInRegion.length === 0) {
    return res.status(404).json({ error: `${queryRegion} isn't in the list of possible regions. Possible regions are: ${allRegions.join(", ")}` });
  }

  res.json({
    region: queryRegion,
    averagePrice: averagePrice
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});