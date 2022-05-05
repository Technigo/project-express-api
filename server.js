import express from "express";
import cors from "cors";

import data from "./data/seattle-restaurants.json";

const formatText = (result) => {
  return result
    .toString()
    .toLowerCase()
    .replace(/[\W_]+/g, " ");
};

// Defines the port the app will run on
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
  const page = req.query.page ? req.query.page : 1;
  const size = req.query.pageSize ? req.query.pageSize : 10;
  const start = (page - 1) * size;
  const end = start + size;
  const restaurants = data.slice(start, end);

  res.json({
    total: data.length,
    pages: Math.ceil(data.length / size),
    currentPage: page,
    pageSize: size,
    results: restaurants,
    success: true,
  });
});

/// This works but look into it.. maybe make "orderedBy" query param instead?
app.get("/restaurants/popular", (req, res) => {
  const popular = data.sort((a, b) => Number(b.Stars_count) - Number(a.Stars_count)).splice(0, 10);

  res.status(200).json({
    results: popular,
    success: true,
  });
});

app.get("/restaurants/:name", (req, res) => {
  const { name } = req.params;
  const namedRestaurant = data.find((item) => formatText(item.Name) === formatText(name));

  if (namedRestaurant) {
    res.status(200).json({
      response: namedRestaurant,
      success: true,
    });
  } else {
    res.status(404).json({
      results: "Not found",
      success: true,
    });
  }
});

app.get("/neighborhoods", (req, res) => {
  const neighborhoods = [...new Set(data.map((item) => item.Area))].sort();
  res.status(200).json({
    results: neighborhoods,
    success: true,
  });
});

app.get("/neighborhoods/:neighborhood", (req, res) => {
  const { neighborhood } = req.params;
  const neighborhoodResults = data.filter(
    (item) => formatText(item.Area) === formatText(neighborhood)
  );

  res.status(200).json({
    total: neighborhoodResults.length,
    results: neighborhoodResults,
    success: true,
  });
});

// make this a query
// restaurants with a rating of 4 stars or higher
const highRanked = data.filter((item) => item.Star >= 4);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
