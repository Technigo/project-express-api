import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
//import data from "./data.json";

//console.log(netflixData.length);

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
  //const type = req.query.type;
  //console.log(type);
  //const showMovie = req.query.type;
  let showsFromYear = netflixData.filter((item) => item.release_year === +year);
  //byter från const till let, gör att man kan annvända igen

  //if (showMovie) {
  //showsFromYear = showsFromYear.filter((item) => item.type);
  //}

  res.json(showsFromYear);
});

app.get("/titleId/:titleId", (req, res) => {
  const id = req.params.titleId;
  const titleWithId = netflixData.filter((item) => item.show_id === +id);
  res.json(titleWithId);
});

app.get("/countries/:countries", (req, res) => {
  const countries = req.params.countries;
  const showCountry = netflixData.filter((item) => item.country === countries);
  res.json(showCountry);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
