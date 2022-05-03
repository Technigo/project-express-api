import express from "express";
import cors from "cors";

import data from "./data/seattle-restaurants.json";

// list of unique areas, 65 values (one of which is '')
const areas = new Set(data.map((item) => item.Area).sort());

// restaurants with a rating of 4 stars or higher
const highRanked = data.filter((item) => item.Star >= 4);

// Capitol Hill restaurants
const capitolHillRestaurants = data.filter((item) => item.Area === "Capitol Hill");

// Example of a specific restaurant
const canlis = data.filter((item) => item.Name === "Canlis");

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
