import express from "express";
import cors from "cors";
import videoGameData from "./data/video-games.json";

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
  res.send("Home page");
});

app.all("*", (req, res) => {
  res.status(404).send("404 Not Found")
})


// This callback function displays all the video game data
app.get("/videogames", (req, res) => {
  res.json(videoGameData)
})

// Array endpoint
app.get("/ratedAs/:rating", (req, res) => {
  const rating = req.params.rating
  console.log({ rating })
  const filteredByRating = videoGameData.filter((item) => item.Rating === +rating)
  res.json(filteredByRating)
})

// Single item endpoint
app.get("/videogames/:videogameId", (req, res) => {
  const id = req.params.videogameId
  console.log({ id })
  const filteredById = videoGameData.filter((item) => item.Id === +id)
  res.json(filteredById)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
