// server.js

import express from "express";
import cors from "cors";
import data from "./data/golden-globes.json";
import routePaths from "./routeInfo";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
//file created in order to provide example of routes for a dear reviewer 
console.log(routePaths); // Add this line
app.get("/", (req, res) => {
  res.json(routePaths);
});

// Nominations endpoint with filters
app.get("/nominations", (req, res) => {
  const { year, category, winner } = req.query;
  let filteredNominations = [...data];

  if (year) {
    filteredNominations = filteredNominations.filter((item) => item.year_award === +year);
  }

  if (category) {
    filteredNominations = filteredNominations.filter((item) => item.category === category);
  }

  if (winner !== undefined) {
    const isWinner = winner.toLowerCase() === 'true';
    filteredNominations = filteredNominations.filter((item) => item.win === isWinner);
  }

  res.json(filteredNominations);
});

// Nominee endpoint
app.get("/nominee/:nominee", (req, res) => {
  const nominee = req.params.nominee;
  const nominationsByNominee = data.find((item) => item.nominee === nominee);

  res.json(nominationsByNominee);
});

// movie endpoint
app.get("/movie/:movie", (req, res) => {
  const movie = req.params.movie;
  const nominationsBymovie = data.find((item) => item.film === movie);

  res.json(nominationsBymovie);
});

// release year endpoint
app.get("/releaseYear/:releaseYear", (req, res) => {
  const releaseYear = req.params.releaseYear;
  const nominationsByreleaseYear = data.filter((item) => item.year_film === +releaseYear);

  res.json(nominationsByreleaseYear);
});

// Award Year endpoint
app.get("/awardYear/:awardYear", (req, res) => {
  const year = req.params.awardYear;
  const showWon = req.query.won;
  const showLost = req.query.lost;
  let nominationsFromYear = data.filter((item) => item.year_award === +year);

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  } else if (showLost) {
    nominationsFromYear = nominationsFromYear.filter((item) => !item.win);
  }

  res.json(nominationsFromYear);
});



// Single nomination by ID endpoint, not found (could be used if data has an ID, this one doesnt)
app.get("/nomination/:id", (req, res) => {
  const nominationId = req.params.id;
  const nomination = data.find((item) => item.id === +nominationId);

  if (!nomination) {
    return res.status(404).json({ error: "Nomination not found" });
  }

  res.json(nomination);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Dummy endpoints
app.post("/nominations", (req, res) => {
  res.status(501).json({ error: "I'm too dummy to be implemented yet" });
});

app.put("/nomination/:id", (req, res) => {
  res.status(501).json({ error: "I'm too dummy to be implemented yet" });
});

app.delete("/nomination/:id", (req, res) => {
  res.status(501).json({ error: "I'm too dummy to be implemented yet)" });
});