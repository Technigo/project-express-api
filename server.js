import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import titles from "./data/netflix-titles.json";

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

app.get("/netflix-titles", (req, res) => {
  const { year, country, type } = req.query;

  let titlesToSend = titles;

  if (year) {
    titlesToSend = titlesToSend.filter(
      (item) => item.release_year === +year
    );
  }
  if (country) {
    titlesToSend = titlesToSend.filter(
      (item) =>
        item.country.toLowerCase().indexOf(country.toLowerCase()) !==
        -1
    );
  }
  if (type) {
    titlesToSend = titlesToSend.filter((item) => item.type === type);
  }
  res.status(200).json({
    response: titlesToSend,
    success: true,
  });
});

app.get("/netflix-titles/movies", (req, res) => {
  let movies = titles.filter((title) => title.type === "Movie");
  res.status(200).json({
    response: movies,
    success: true,
  });
});

// the plus-sign before id says to convert it from string to number
app.get("/netflix-titles/movies/:id", (req, res) => {
  const { id } = req.params;
  let movieWithTitle = titles.find(
    (item) => item.show_id === +id && item.type === "Movie"
  );
  if (!movieWithTitle) {
    res.status(404).json({
      response: "There is no such movie",
      success: false,
    });
  }
  res.status(200).json({
    response: movieWithTitle,
    success: true,
  });
});

app.get("/netflix-titles/tv-shows", (req, res) => {
  let tvShows = titles.filter((title) => title.type === "TV Show");
  res.status(200).json({
    response: tvShows,
    success: true,
  });
});

app.get("/netflix-titles/tv-shows/:id", (req, res) => {
  const { id } = req.params;
  let showsWithTitle = titles.find(
    (item) => item.show_id === +id && item.type === "TV Show"
  );
  if (!showsWithTitle) {
    res.status(404).json({
      response: "There is no such movie",
      success: false,
    });
  }
  res.status(200).json({
    response: movieWithTitle,
    success: true,
  });
});

app.get("/netflix-titles/tv-shows/:year", (req, res) => {
  const year = req.params.year;
  let tvSHowsWithYear = titles.filter(
    (item) => item.release_year === +year && item.type === "TV Show"
  );
  if (!tvSHowsWithYear) {
    res.status(404).json({
      response: `There are no tv-shows from ${year}`,
      success: false,
    });
  }
  res.status(200).json({
    response: tvSHowsWithYear,
    success: true,
  });
});

app.get("*", function (req, res) {
  res.status(404).json({
    response: "There is no such page",
    success: false,
  });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
