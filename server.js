import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

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
  res.send("Netflix n chill!");
});

// Route to get all the Netflix data
app.get("/titles", (req, res) => {
  res.json(netflixData)
})

// Route to get the titles from a specific year
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const titlesFromYear = netflixData.filter((item) => item.release_year === +year)
  res.json(titlesFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
