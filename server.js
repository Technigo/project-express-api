import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
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
  res.send("Nobel price winners");
});

app.get("/winners", (req, res) => {
  res.json(nobelData)
});

app.get("/winners/:winnerId", (req, res) => {
  const winnerId = req.params.winnerId
  const winner = nobelData.find((item) => item.laureateID === +winnerId)
  
  if (winner) {
    res.json(winner)
  } else {
    res.status(404).send("Winner not found")
  }
});

app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const winnersFromYear = nobelData.filter((item) => item.year === +year)
  res.json(winnersFromYear)
});

app.get("/category/:category", (req, res) => {
  const category = req.params.category
  const showBornCountry = req.query.bornCountry
  let winnersPerCategory = nobelData.filter((item) => item.category === category);

  if (showBornCountry) {
    winnersPerCategory = winnersPerCategory.filter((item) => item.bornCountry === showBornCountry);
  }

  res.json(winnersPerCategory)
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
