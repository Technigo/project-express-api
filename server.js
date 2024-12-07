import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import avocadoSalesData from "./data/avocado-sales.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// API documentation with endpoint listing
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to the API!",
    documentation: "Below are the available endpoints:",
    endpoints,
  });
});

// Filter avocado sales data by date or region
app.get("/avocadoSalesData", (req, res) => {
  const { date, region } = req.query;

  let filteredData = avocadoSalesData;

  // Filter by date
  if (date) {
    filteredData = filteredData.filter(
      (avocados) => avocados.date.toLowerCase() === date.toLowerCase()
    );
  }

  // Filter by region
  if (region) {
    filteredData = filteredData.filter(
      (avocados) => avocados.region.toLowerCase() === region.toLowerCase()
    );
  }

  // Check if data matches the filters
  if (filteredData.length > 0) {
    res.status(200).json(filteredData);
  } else {
    res.status(404).send("Avocado not found");
  }
});

// Filter by ID
app.get("/avocadoSalesData/:id", (req, res) => {
  const id = req.params.id;

  const avocados = avocadoSalesData.find((item) => item.id === +id);
  if (avocados) {
    res.status(200).json(avocados);
  } else {
    res.status(404).send("No avocado sales data found with the given ID");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
