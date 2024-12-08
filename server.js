import express from "express";
import cors from "cors";
import expresslistEndpoints from "express-list-endpoints";
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
  const endpoints = expresslistEndpoints(app);
  res.json({ endpoints });
});

// All shows in the Netflix data

app.get("/shows", (req, res) => {
  res.json(netflixData);
});

//One show based on Country

app.get("/shows/countries/:countryData", (req, res) => {
  const { countryData } = req.params;

  //Corrects so that you can type the country without spacing or capital letters
  const sanitizedCountryData = countryData.replace(/\s/g, "").toLowerCase();

  const country = netflixData.find(
    (show) =>
      show.country.replace(/\s/g, "").toLowerCase() === sanitizedCountryData
  );

  console.log("countryData", countryData, typeof countryData);

  if (country) {
    res.json(country);
  } else {
    res.status(404).send("No such country was found");
  }
});

// One show based on id

app.get("/shows/id/:showId", (req, res) => {
  const { showId } = req.params;

  const show = netflixData.find((show) => show.show_id === +showId);

  console.log("showID", showId, typeof +showId);

  if (show) {
    res.json(show);
  } else {
    res.status(404).send("No show was found");
  }
});

//All shows from that year

app.get("/shows/year/:year", (req, res) => {
  const { year: showYear } = req.params;

  const showFromYear = netflixData.filter(
    (show) => show.release_year === +showYear
  );

  console.log("showYear", showYear, typeof +showYear);

  if (showFromYear) {
    res.json(showFromYear);
  } else {
    res.status(404).send("No show from that year was found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
