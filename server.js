import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";

// Import data
import avocadoSalesData from "./data/avocado-sales.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=8080 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// http://localhost:8080/
app.get("/", (req, res) => {
  
  res.json(endpoints);
});

// Get all avocadoSalesData
// http://localhost:8080/avocadoSales
app.get("/avocadoSalesData", (req, res) => {
  let filterAvocadoSales = [...avocadoSalesData];
  let averagePriceAvocado = [...avocadoSalesData];

  //query for region search
  //http://localhost:8080/avocadoSalesData?region=Charlotte
  const regionSearch = req.query.region;
  if (regionSearch) {
    filterAvocadoSales = filterAvocadoSales.filter((item) => 
    item.region.toLowerCase().includes(regionSearch.toLowerCase()));
  } else {
    res.status(404).send("avocado sales data for the specified region was not found");
  }

  res.json(filterAvocadoSales);

});

// Get one avocadoSale based on id
// http://localhost:8080/avocadoSalesData/12
app.get("/avocadoSalesData/:avocadoSalesDataId", (req, res) => {
  const { avocadoSalesDataId } = req.params;

  const avocadoSale = avocadoSalesData.find(
    (avocadoSale) => +avocadoSalesDataId === avocadoSale.id
  );

  if (avocadoSale) {
    res.json(avocadoSale);
  } else {
    res.status(404).json({ error: "Avocado sales Id not found" });
  }
});

// Get avocadoSalesData within a price range
// http://localhost:8080/avocadoSalesData/avgPriceRange?minPrice=X.X&maxPrice=Y.Y
app.get("/avocadoSalesData/avgPriceRange", (req, res) => {
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);

  if (isNaN(minPrice) || isNaN(maxPrice) || minPrice >= maxPrice) {
    return res.status(404).send("Invalid price range");
  }

  const filteredAvocadoSales = avocadoSalesData.filter((item) =>
    item.averagePrice >= minPrice && item.averagePrice <= maxPrice
  );

  res.json(filteredAvocadoSales);
});

// Get a slice of avocadoSalesData
// http://localhost:8080/avocadoSalesData/slice/:startIndex/:endIndex
app.get("/avocadoSalesData/slice/:startIndex/:endIndex", (req, res) => {
  const { startIndex, endIndex } = req.params;

  // Convert startIndex and endIndex to integers
  const start = parseInt(startIndex);
  const end = parseInt(endIndex);

  // Check if the start and end indexes are valid
  if (!isNaN(start) && !isNaN(end) && start >= 0 && end >= 0 && end >= start) {
    // Use slice to get a subset of the avocado sales data
    const slicedData = avocadoSalesData.slice(start, end + 1); // Adding 1 to endIndex because slice endIndex is exclusive

    if (slicedData.length > 0) {
      res.json(slicedData);
    } else {
      res.status(404).send("No avocado sales data found in the specified range");
    }
  } else {
    res.status(400).send("Invalid start or end index");
  }
});

// Getting all endpoint with express List Endpoints
const endpoints = expressListEndpoints(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
