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
  res.send("Netflix data!");
});

app.get('/movies', (req, res) => {
  res.status(200).json(netflixData);
});

app.get("/movies/id/:id", (req,res) => {
  const { id } = req.params
  const showId = netflixData.find(show => show.show_id === +id)

  if (!showId) {
    res.status(404).send("No movie found")
  } else {
    res.json(showId)
  }
  
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
