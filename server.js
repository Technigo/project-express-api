import express from "express";
import cors from "cors";
import flowerData from "./data/old-flowers.json";
import expressListEndpoints from "express-list-endpoints";

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Get all flowers
app.get("/flowers", (req, res) => {
  let filterFlowers = [...flowerData];

  // Query for flower color
  const colorFilter = req.query.color;
  if (colorFilter) {
    filterFlowers = filterFlowers.filter((flower) =>
      flower.color
        .map((color) => color.toLowerCase())
        .includes(colorFilter.toLowerCase())
    );
  }

  // Query for flower type
  const typeFilter = req.query.type;
  if (typeFilter) {
    filterFlowers = filterFlowers.filter((flower) =>
      flower.type.toLowerCase().includes(typeFilter.toLowerCase())
    );
  }

  // Check if sorting query parameter is present
  const sortByAtoZ = req.query.sort === "asc";

  if (sortByAtoZ) {
    filterFlowers.sort((a, b) => a.name.localeCompare(b.name, "sv"));
  } else if (req.query.sort === "desc") {
    filterFlowers.sort((a, b) => b.name.localeCompare(a.name, "sv"));
  }

  if (filterFlowers.length > 0) {
    res.json(filterFlowers);
  } else {
    res.status(404).send("No flower was found");
  }
});

// Get one flower based on id
app.get("/flowers/:flowerId", (req, res) => {
  const { flowerId } = req.params;

  const flower = flowerData.find((flower) => +flowerId === flower.id);

  if (flower) {
    res.json(flower);
  } else {
    res.status(404).send("No flower was found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
