import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import videogames from "./data/nintendoswitch-games.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 3000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

// Endpoint that returns all the videogames
app.get("/videogames", (req, res) => {
  const category = req.query.category;
  const year = req.query.year;

  // Filter on category if category is sent
  // For example http://localhost:3000/videogames?category=racing
  if (category) {
    const filterCategory = videogames.filter(game => game.category.toLowerCase() === category);
    res.json(filterCategory);

    // Endpoint that returns a specific year
    // For example http://localhost:3000/videogames?year=2020
  } if (year) {
    const videogameByYear = videogames.filter(game => game.release_year === +year);
    res.json(videogameByYear);

    // If no categori is sent, return all videogames
    // For example http://localhost:3000/videogames
  } else {
    res.json(videogames);
  };
});

// Endpoint that returns one single videogame
// For example with id=3 http://localhost:3000/videogames/3
app.get("/videogames/:id", (req, res) => {
  const id = req.params.id;
  const videogame = videogames.find(game => game.id === +id);

  if (videogame) {
    res.json(videogame);
  } else {
    res.send("No videogame found with that ID");
  }
});

// Endpoint that returns a list sorted by highest rating
// For example http://localhost:3000/videogames/sorted/ratings
app.get("/videogames/sorted/ratings", (req, res) => {
  const sortedGames = videogames.sort((a, b) => b.rating - a.rating);
  res.json(sortedGames);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
