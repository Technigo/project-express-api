import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import avocadoSalesData from "./data/avocado-sales.json";
console.log(avocadoSalesData);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const listEndPoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndPoints(app));
});

app.get("/avocado-sales", (req, res) => {
  res.json(avocadoSalesData);
});

app.get("/avocado-sales/:id", (req, res) => {
  const id = req.params.id;
  const avocadoSale = avocadoSalesData.find((a) => a.id === parseInt(id));
  if (avocadoSale) {
    res.json(avocadoSale);
  } else {
    res.status(404).send("No avocado sale found with id: :id");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
