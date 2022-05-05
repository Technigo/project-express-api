import express from "express";
import cors from "cors";

import data from "./data/seattle-restaurants.json";

const formatText = (result) => {
  return result
    .toString()
    .toLowerCase()
    .replace(/[\W_]+/g, "");
};

const orderData = (data, sorting) => {
  switch (sorting) {
    case "cheapest":
      data = data.sort((a, b) => formatText(a.Price.length) - formatText(b.Price.length));
    case "priciest":
      data = data.sort((a, b) => formatText(b.Price.length) - formatText(a.Price.length));
    case "popular":
      data = data.sort((a, b) => Number(b.Stars_count) - Number(a.Stars_count));
    case "unpopular":
      data = data.sort((a, b) => Number(a.Stars_count) - Number(b.Stars_count));
    default:
      data = data;
  }
  return data;
};

const paginateResults = (data, req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const size = req.query.pageSize ? req.query.pageSize : 10;
  const start = (page - 1) * size;
  const end = start + size;
  const totalPages = Math.ceil(data.length / size);

  if (page < 1 || (page > totalPages && data.length > 0)) {
    res.status(422).json({
      success: false,
      statusMessage: `Invalid page number. Start index: 1. End index: ${totalPages}`,
    });
  }

  return {
    success: true,
    total: data.length,
    pages: totalPages,
    startIndex: 1,
    currentPage: page,
    pageSize: size,
    results: data.slice(start, end),
  };
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
  res.json(paginateResults(data, req, res));
});

/// This works but look into it.. maybe make "orderedBy" query param instead?
app.get("/restaurants/popular", (req, res) => {
  const popular = data.sort((a, b) => Number(b.Stars_count) - Number(a.Stars_count)).splice(0, 10);

  res.status(200).json({
    success: true,
    results: popular,
  });
});

app.get("/restaurants/:name", (req, res) => {
  const { name } = req.params;
  const namedRestaurant = data.find((item) => formatText(item.Name) === formatText(name));

  namedRestaurant
    ? res.status(200).json({
        success: true,
        response: namedRestaurant,
      })
    : res.status(404).json({
        success: true,
        results: "Not found",
      });
});

app.get("/neighborhoods", (req, res) => {
  const neighborhoods = [...new Set(data.map((item) => item.Area))].sort();
  res.status(200).json({
    success: true,
    total: neighborhoods.length,
    results: neighborhoods,
  });
});

app.get("/neighborhoods/:neighborhood", (req, res) => {
  const { neighborhood } = req.params;
  const neighborhoodResults = data.filter(
    (item) => formatText(item.Area) === formatText(neighborhood)
  );
  res.status(200).json(paginateResults(neighborhoodResults, req, res));
});

// make this a query
// restaurants with a rating of 4 stars or higher
const highRanked = data.filter((item) => item.Star >= 4);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
