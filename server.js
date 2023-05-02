import express from "express";
import cors from "cors";
import videoGames from "./data/video-games.json";

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
  res.send("Hello world!");
});


// In this callback function, I am displaying all the data from the JSON
app.get("/games", (req, res) => {
  res.json(videoGames)
})

// Ratings endpoint with a rating variable
app.get("/ratings/:rating", (req, res) => {
  const rating = req.params.rating
  console.log({ rating })
  const ratedAs = videoGames.filter((item) => item.Rating === +rating)
  res.json(ratedAs)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
