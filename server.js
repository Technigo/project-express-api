import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
import expressListEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(expressListEndpoints(app));
});

app.get("/titles", (req, res) => {
  const year = req.query.year;
  if (year !== undefined) {
    res.send(
      netflixData.filter((title) => title.release_year.toString() === year)
    );
  } else {
    res.send(netflixData);
  }
});

app.get("/movies", (req, res) => {
  res.send(netflixData.filter((title) => title.type === "Movie"));
});

app.get("/id/:id", (req, res) => {
  const id = req.params.id;
  const result = netflixData.find((title) => title.show_id.toString() === id);
  if (result !== undefined) {
    res.send(result);
  } else {
    res.status(404).send("ID not founnd");
  }
});

app.get("/rating/:rating", (req, res) => {
  const rating = req.params.rating;
  res.send(netflixData.filter((title) => title.rating === rating));
});

app.get("/movies/duration/:titleDuration", (req, res) => {
  const titleDuration = req.params.titleDuration;
  const movieList = netflixData.filter((title) => title.type === "Movie");
  const result = movieList.filter((movie) => {
    const movieDuration = movie.duration.slice(0, -4);
    return +movieDuration <= +titleDuration;
  });
  res.send(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
