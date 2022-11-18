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
  res.json({responseMessage: "🥑 Check out US avocado sales! 🥑"});
});

// -----------  THIS WEEK'S PROJECT - AVOCADO SALES -------------------

// get the total list of data
app.get("/avocado-sales", (req, res) => {
  res.status(200).json({avocadoSalesData});
});

// get the total list of data in reversed order
app.get("/avocado-sales/reversed", (req, res) => {
  const avocadoSalesDataReversed = avocadoSalesData.reverse()
  res.status(200).json({avocadoSalesDataReversed });
});

// search by id
app.get("/avocado-sales/:id", (req, res) => {
  const singleAvocado = avocadoSalesData.find((avocado) => {
  return avocado.id === Number(req.params.id);
});
if(singleAvocado) {
    res.status(200).json({
    success: true,
    message: "OK",
    body: {
      avocadoSalesData: singleAvocado
    }
  });
} else {
    res.status(404).json({
    success: false,
    message: "Not found",
    body: {}
});
}
console.log(singleAvocado);
});

// search by region
app.get("/avocado-sales/region/:region", (req, res) => {
  const region = req.params.region
  const filteredOnRegionName = avocadoSalesData.filter((item) => item.region.toLowerCase() === region.toLowerCase());
  res.status(200).json({filteredOnRegionName});
});

// get a list of avocado sales under or equal to the route parameter average price
app.get("/avocado-sales/averagePrice/:averagePrice", (req, res) => {
  const { averagePrice } = req.params
  const avocados = avocadoSalesData.filter(avocado => avocado.averagePrice <= averagePrice)

  if (avocados.length === 0) {
    res.status(404).send('No avocado sales found to this price....🥑')
  } else {
    res.json(avocados)
  }
})

// get a list of the lowest to highest average price - Doesn't work! 
app.get("/avocado-sales/averagePrice", (req, res) => {
  const avocadoAveragePrice = avocadoSalesData.sort((a, b) => Number(b.averagePrice) - Number(a.averagePrice))
  res.status(200).json(avocadoAveragePrice.slice(1, [-1]))
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
