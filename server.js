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
  res.send("Hello Technigo!");
});

// Defines a route to the entire data set of avocado sales
app.get("/top-sales", (req, res) => {
  const topSales = avocadoSalesData.slice(0, 100);
  res.json(topSales);
  console.log(topSales.length);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
