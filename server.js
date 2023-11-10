import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import avocadoSalesData from "./data/avocado-sales.json";
// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// access control in the HTTP request
app.use(cors());
app.use(express.json());

// Route to get all avocado sales data
app.get("/avocado-sales/", (req, res) => {
  const { page } = req.query;
  const pageSize = 10; // Set the number of items per page

  // Convert page to a number, default to 1 if not provided or not a valid number
  const pageNumber = page ? parseInt(page, 10) : 1;

  // Calculate the start and end indices for the slice
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = pageNumber * pageSize;

  // Slice the data based on the calculated indices
  const paginatedData = avocadoSalesData.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    message: "OK ✅",
    body: { paginatedData },
  });
  // res.json(avocadoSalesData);
});

app.post("/avocado-sales", (req, res) => {
  // Placeholder for future complex operations to add a new avocado sale
  res.status(501).json({
    success: false,
    message: "Not Implemented ❌",
    body: { error: "Adding new avocado sale not implemented yet" },
  });
});
// Route to get a list of all registered endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Route to get data by ID
app.get("/avocado-sales/:id", (req, res) => {
  const id = Number(req.params.id);
  const singleAvocado = avocadoSalesData.find((avocado) => avocado.id === id);

  if (singleAvocado) {
    res.status(200).json({
      sucess: true,
      message: "OK ✅",
      body: { avocadoSalesData: singleAvocado },
    });
  } else {
    res.status(404).json({
      sucess: false,
      message: "Not Found ❌",
      body: {},
    });
  }
});

// search by region
app.get("/avocado-sales/region/:region", (req, res) => {
  const region = req.params.region;

  if (!region) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Region parameter is required ❌",
      body: {},
    });
  }

  const filteredRegion = avocadoSalesData.filter(
    (item) => item.region.toLowerCase() === region.toLowerCase()
  );

  if (filteredRegion.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Not Found: No data found for the specified region ❌",
      body: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "OK ✅",
    body: { filteredRegion },
  });
});
// find the minPrice and maxPrice of average price
app.get("/avocado-sales/volume/totalVolume", (req, res) => {
  const { min, max } = req.query;

  // Convert min and max to numbers
  // make a request to http://localhost:8080/avocado-sales/volume/totalVolume?min=0.88&max=0.9
  const minPrice = min ? parseFloat(min) : 0;
  const maxPrice = max ? parseFloat(max) : Number.MAX_VALUE;

  // Filter the data based on the min and max prices
  const filteredData = avocadoSalesData.filter(
    (item) => item.averagePrice >= minPrice && item.averagePrice <= maxPrice
  );

  res.status(200).json({
    success: true,
    message: "OK ✅",
    body: { filteredData },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
