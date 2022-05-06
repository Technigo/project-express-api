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

app.get("/", (req, res) => {
  res.status(200).json({
    Hello: "Hello there!",
    Routes: [
      { "/avocadosales": "all avocado sales data" },
      { "/regions": "returns list of regions" },
      { "/avocadosales/:regions": "returns data for specific region" },
    ],
  });
});

app.get("/avocadosales", (req, res) => {
  res.status(200).json({
    data: avocadoSalesData,
    success: true,
  });
});

app.get("/regions", (req, res) => {
  const regionsList = avocadoSalesData.map((o) => o.region);
  const regions = [...new Set(regionsList)];

  if (regions) {
    res.status(200).json({ data: regions, success: true });
  } else {
    // IN THEORY: Should not send back 404. The data should be an empty array.
    res.status(200).json({ data: [], success: false });
  }
});

app.get("/avocadosales/:region", (req, res) => {
  const region = req.params.region;
  const avocadoRegion = avocadoSalesData.filter(
    (item) => item.region.toLowerCase() === region.toLowerCase()
  );
  if (avocadoRegion) {
    res.status(200).json({ data: avocadoRegion, success: true });
  } else {
    // IN THEORY: Should not send back 404. The data should be an empty array.
    res.status(200).json({ data: [], success: false });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
