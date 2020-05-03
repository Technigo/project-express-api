import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
/*app.get("/", (req, res) => {
  res.send("Hello Kajsa");
});*/

app.get("/", (req, res) => {
  // Displays all movies and shows
  res.json(netflixData);
});

app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  const showType = req.query.type;
  let showsFromYear = netflixData.filter((item) => item.release_year === +year);

  if (showType) {
    showsFromYear = showsFromYear.filter((item) => item.type === showType);
  }

  res.json(showsFromYear);
});

app.get("/titleId/:titleId", (req, res) => {
  const id = req.params.titleId;
  const titleWithId = netflixData.filter((item) => item.show_id === +id);
  res.json(titleWithId);
});

app.get("/countries/:countries", (req, res) => {
  const countries = req.params.countries;
  const showYear = req.query.year;
  let showCountry = netflixData.filter((item) => item.country === countries);

  if (showYear) {
    showCountry = showCountry.filter((item) => item.release_year === +showYear);
  }

  res.json(showCountry);
});

app.get("/types/:types", (req, res) => {
  const types = req.params.types;
  const showYear = req.query.year;
  let showType = netflixData.filter((item) => item.type === types);

  if (showYear) {
    showType = showType.filter((item) => item.release_year === +showYear);
  }

  res.json(showType);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
