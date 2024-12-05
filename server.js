import express from "express";
import cors from "cors";

import avocadoSalesData from "./data/avocado-sales.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API!",
    documentation: "Below are the available endpoints:",
    endpoints: [
      {
        method: "GET",
        path: "/avocadoSalesData",
        description: "Retrieve avocado sales data, optionally filtered by date or region."
      },
      {
        method: "GET",
        path: "/avocadoSalesData/:id",
        description: "Retrieve a single avocado sales data entry by ID."
      },
    ]
  });
});

// Filter avocado sales data by date or region
app.get("/avocadoSalesData", (req, res) => {
  const { date, region } = req.query;

  let filteredData = avocadoSalesData;

  if (date) {
    filteredData = filteredData.filter(avocados => avocados.date.toLowerCase() === date.toLowerCase());
  }

  if (region) {
    filteredData = filteredData.filter(avocados => avocados.region.toLowerCase() === region.toLowerCase());

    res.status(200).json(filteredData);
  }


});

// Retrieve avocado sales data by ID
app.get("/avocadoSalesData/:id", (req, res) => {
  const id = req.params.id;

  const avocados = avocadoSalesData.find(item => item.id === +id);
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
