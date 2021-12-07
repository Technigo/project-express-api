import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(goldenGlobesData);
});

app.get("/winners", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) => item.win);
  res.json(filteredMovies);
});

app.get("/movies", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) =>
    item.category.includes("Motion Picture")
  );
  res.json(filteredMovies);
});

app.get("/series", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) =>
    item.category.includes("Series")
  );
  res.json(filteredMovies);
});

app.get("/animated", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) =>
    item.category.includes("Animated")
  );
  res.json(filteredMovies);
});

app.get("/foreign", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) =>
    item.category.includes("Foreign Language")
  );
  res.json(filteredMovies);
});

app.get("/winners/movies", (req, res) => {
  let filteredMovies = goldenGlobesData.filter(
    (item) => item.category.includes("Motion Picture") && item.win
  );
  res.json(filteredMovies);
});

app.get("/winners/series", (req, res) => {
  let filteredMovies = goldenGlobesData.filter(
    (item) => item.category.includes("Series") && item.win
  );
  res.json(filteredMovies);
});

app.get("/winners/animated", (req, res) => {
  let filteredMovies = goldenGlobesData.filter(
    (item) => item.category.includes("Animated") && item.win
  );
  res.json(filteredMovies);
});

app.get("/winners/foreign", (req, res) => {
  let filteredMovies = goldenGlobesData.filter(
    (item) => item.category.includes("Foreign Language") && item.win
  );
  res.json(filteredMovies);
});

app.get("/nominee/:nominee", (req, res) => {
  const { nominee } = req.params;
  const showNominee = goldenGlobesData.find(
    (item) =>
      item.nominee.toString().toLocaleLowerCase() ===
      nominee.toString().toLocaleLowerCase()
  );

  if (!showNominee) {
    res
      .status(404)
      .send("Sorry, we couldn't find the nominee you're looking for!");
  } else {
    res.json(showNominee);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
