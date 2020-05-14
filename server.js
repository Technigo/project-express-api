import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Root endpoint
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

//Displays all awards
app.get("/", (req, res) => {
  res.json(data);
});

// Displays all the movies/shows
app.get("/shows", (req, res) => {
  res.json(data);
});

//Displays movies/shows depending on year
app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  const showType = req.query.type;
  let showsYear = data.filter((item) => item.release_year === +year);

  if (showType) {
    showsYear = showsYear.filter(
      (item) => item.type.toLowerCase() === showType.toLowerCase()
    );
  }
  res.json(showsYear);
});

//Displays movies/shows from a specific country
app.get("/countries/:countries", (req, res) => {
  const countries = req.params.countries;

  let showCountry = data.filter(
    (item) => item.country.toString().toLowerCase() === countries.toLowerCase()
  );

  res.json(showCountry);
});

//Displays a movie/show with a specific show_id
app.get("/shows/:showId", (req, res) => {
  const id = req.params.showId;
  const showWithId = data.filter((item) => item.show_id === +id);
  res.json(showWithId);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
