import express from "express";
import cors from "cors";
import avocadoSalesData from "./data/avocado-sales.json";
import expressListEndpoints from "express-list-endpoints";

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
  const endpoints = expressListEndpoints(app);
  const documentation = endpoints.map((endpoint) => ({
    method: endpoint.methods.join(", "),
    path: endpoint.path,
  }));
  res.json(documentation);
});

app.get("/avocado-sales/region", async (req, res) => {
  const avocadoSalesByRegion = {};
  avocadoSalesData.forEach((item) => {
    //access the original data
    const region = item.region; // assign item.region to a variable

    if (!avocadoSalesByRegion[region]) {
      //if there is no such region in the avocadoSalesByRegion object, create an arr for that region and push in the item.
      avocadoSalesByRegion[region] = [];
    }
    avocadoSalesByRegion[region].push(item); //if the region exist, just push in the item into the matched region
  });
  res.json(avocadoSalesByRegion);
});

app.get("/avocado-sales/region/:regionName/:date", (req, res) => {
  const regionName = req.params.regionName;
  const date = req.params.date;

  const avocadoSalesByRegion = avocadoSalesData.filter(
    (item) => item.region === regionName && item.date === date
  );

  if (avocadoSalesByRegion.length === 0) {
    return res.status(404).json({ error: "Item not found!" });
  }

  res.json(avocadoSalesByRegion);
});

app.get("/avocado-sales/region/:regionName", (req, res) => {
  const regionName = req.params.regionName;

  const avocadoSalesByRegion = avocadoSalesData.filter(
    (item) => item.region === regionName
  );

  if (avocadoSalesByRegion.length === 0) {
    return res.status(404).json({ error: "Region not found!" });
  }

  res.json(avocadoSalesByRegion);
});

///avocado-sales this end point needs to be defined after the others
app.get("/avocado-sales", (req, res) => {
  res.json(avocadoSalesData);
});

app.get("/avocado-sales/:date", (req, res) => {
  const date = req.params.date;
  const avocadoSalesFromDate = avocadoSalesData.filter(
    (item) => item.date === date
  );

  if (avocadoSalesFromDate.length === 0) {
    return res.status(404).json({ error: "Date not found!" });
  }

  res.json(avocadoSalesFromDate);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
