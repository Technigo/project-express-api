import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";
import listEndpoints from "express-list-endpoints";

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
  res.send(listEndpoints(app));
});

app.get("/winners", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) => item.win);
  res.json(filteredMovies);
});

app.get("/losers", (req, res) => {
  let filteredMovies = goldenGlobesData.filter((item) => item.win === false);
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

app.get("/nominees/:nominee", (req, res) => {
  const { nominee } = req.params;
  const showNominee = goldenGlobesData.find(
    (item) =>
      item.nominee.toString().toLocaleLowerCase() ===
      nominee.toString().toLocaleLowerCase()
  );

  if (!showNominee) {
    res.status(404).json({
      response: "Sorry, we couldn't find the nominee you're looking for!",
      success: false,
    });
  } else {
    res.status(200).json({
      respons: showNominee,
      success: true,
    });
  }
});

// DUMMY ENDPOINTS //
app.get("/backdrops/:backdrop", (req, res) => {
  const { backdrop } = req.params;
  const showBackdrop = goldenGlobesData.find(
    (item) => item.backdrop === backdrop
  );

  if (!showBackdrop) {
    res.status(404).json({
      response: "Sorry, we couldn't find the backdrop you're looking for!",
      success: false,
    });
  } else {
    res.status(200).json({
      respons: showBackdrop,
      success: true,
    });
  }
});

app.get("/posters/:poster", (req, res) => {
  const { poster } = req.params;
  const showPoster = goldenGlobesData.find((item) => item.poster === poster);

  if (!showPoster) {
    res.status(404).json({
      response: "Sorry, we couldn't find the poster you're looking for!",
      success: false,
    });
  } else {
    res.status(200).json({
      respons: showPoster,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
