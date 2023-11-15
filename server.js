import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import nobelData from "./data/nobel-data.json";

console.log(nobelData);

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
  const endpoints = listEndpoints(app);
  res.json({ endpoints });
});

// Show all data (all winners of all time)
// Filter on category and year (i.e. /winners?category=Peace&year=2000)
app.get("/winners", (req, res) => {
  let filteredWinners = [...nobelData]; //Makes a copy of the array
  const { category, year } = req.query;
if (category) {
  filteredWinners = filteredWinners.filter((item) => item.category === category);
}

if (year) {
  filteredWinners = filteredWinners.filter((item) => item.year === +year);
}

  res.json(filteredWinners);
});

// Shows one specific winner based on their Id
app.get("/winners/:winnerId", (req, res) => {
  const winnerId = req.params.winnerId
  const winner = nobelData.find((item) => item.laureateID === +winnerId)
  
  if (winner) {
    res.json(winner)
  } else {
    res.status(404).send("Winner not found")
  }
});

// Shows winner per specified year
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const winnersFromYear = nobelData.filter((item) => item.year === +year)
  res.json(winnersFromYear)
});

//Shows winner per category and per born country 
app.get("/category/:category", (req, res) => {
  const category = req.params.category
  const showBornCountry = req.query.bornCountry
  let winnersPerCategory = nobelData.filter((item) => item.category === category);

  if (showBornCountry) {
    winnersPerCategory = winnersPerCategory.filter((item) => item.bornCountry === showBornCountry);
  }

  res.json(winnersPerCategory)
});

// Shows winner per organization country
app.get("/country/:country", (req, res) => {
  const country = req.params.country
  const winnersPerCountry = nobelData.filter((item) => item.organizationCountry === country)
  res.json(winnersPerCountry)
});

// Placeholders for future enpoints
app.get("/statistics", (req, res) => {
  // Perform statistical operations on the Nobel data (future implementation)
  res.send("Placeholder for statistics endpoint");
});

app.get("/predictions", (req, res) => {
  // Perform predictive analysis on the Nobel data (future implementation)
  res.send("Placeholder for predictions endpoint");
});

app.get("/insights", (req, res) => {
  // Provide insights into specific categories or countries (future implementation)
  res.send("Placeholder for insights endpoint");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
