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
const walrus = data.filter((item) => item.Name === "The Walrus and the Carpenter");

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
  res.send("Welcome to this API!");
});

app.get("/restaurants", (req, res) => {
  res.status(200).json(data);
});

// this works
app.get("/restaurants/popular", (req, res) => {
  const popular = data.sort((a, b) => Number(b.Stars_count) - Number(a.Stars_count)).splice(0, 10);

  res.status(200).json({
    response: popular,
    success: true,
  });
});

// this works
app.get("/restaurants/:name", (req, res) => {
  const { name } = req.params;
  const namedRestaurant = data.find(
    (item) => item.Name.toString().toLowerCase().replaceAll(" ", "") === name.toLowerCase()
  );

  if (namedRestaurant) {
    res.status(200).json({
      data: namedRestaurant,
      success: true,
    });
  } else {
    res.status(404).json({
      data: `Sorry, the restaurant ${name} could not be found`,
      success: true,
    });
  }
});

//this works
app.get("/neighborhoods", (req, res) => {
  const areas = [...new Set(data.map((item) => item.Area.toString()))].sort();
  res.status(200).json({
    response: areas,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
