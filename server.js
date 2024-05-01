import express from "express";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";
import data from "./data/nobel-prize-women.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here:

// Get documentation of the API
// http://localhost:8080/
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Get all awards
// http://localhost:8080/awards
app.get("/awards", (req, res) => {
  res.json(data);
});

// Get one award based on id
// http://localhost:8080/awards/15 for example
app.get("/awards/:awardId", (req, res) => {
  const { awardId } = req.params;

  const award = data.find((award) => +awardId === award.ID);

  if (award) {
    res.json(award);
  } else {
    res.status(404).send("No award was found");
  }
});

// Get awards from a specific year
// http://localhost:8080/year/2009 for example
app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  const awardsFromYear = data.filter((item) => item.Year === +year);

  if (awardsFromYear.length === 0) {
    res.status(404).send("No female award winners was found that year");
  } else {
    res.json(awardsFromYear);
  }
});

// Get awards won in a specific category
// http://localhost:8080/category/chemistry for example
app.get("/category/:category", (req, res) => {
  const requestedCategory = req.params.category.toLowerCase();
  const awardsInCategory = data.filter((item) =>
    item.Category.toLowerCase().includes(requestedCategory)
  );

  if (awardsInCategory.length === 0) {
    res.status(404).send("No female award winners was found in this category");
  } else {
    res.json(awardsInCategory);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
