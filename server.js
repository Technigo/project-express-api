import express from "express";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
import goldenGlobesData from "./data/golden-globes.json";
import netflixData from "./data/netflix-titles.json";
import topMusicData from "./data/top-music.json";
import magicItems from "./data/magic-items.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9923;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Avocado Tree
app.get("/avocado", (req, res) => {
  let filterList = [...avocadoSalesData];

  // Query for a specific region
  const regionSearch = req.query.region;
  if (regionSearch) {
    filterList = filterList.filter((item) =>
      item.region.toLowerCase().includes(regionSearch.toLowerCase())
    );
  }

  // Query to filter out all entries at a price point higher than the query.
  const priceSearch = req.query.lowestprice;
  if (priceSearch) {
    filterList = filterList.filter((item) => item.averagePrice >= +priceSearch);
  }

  if (filterList.length > 0) {
    res.json(filterList);
  } else {
    res.status(404).send("No region found with that name!");
  }
});

app.get("/avocado/:avocadoId", (req, res) => {
  const { avocadoId } = req.params;
  const item = avocadoSalesData.find((findItem) => +avocadoId === findItem.id);

  if (item) {
    res.send(item);
  } else {
    res.status(404).send("No avocado found with that Id!");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
