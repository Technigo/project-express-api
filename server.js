import express from "express";
import cors from "cors";
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

// All shows - FUNKAR as of söndag

app.get("/shows", (req, res) => {
  res.json(netflixData);
});

//One show based on Country

app.get("/shows/country/:countryData", (req, res) => {
  const { countryData } = req.params;

  const country = netflixData.find((show) => show.country === countryData);

  console.log("countryData", countryData, typeof countryData);

  if (country) {
    res.json(country);
  } else {
    res.status(404).send("No such country was found");
  }
});

// One show based on id FUNKAR as of söndag- kanske lägga till shows/id separat också?

app.get("/shows/id/:showId", (req, res) => {
  const { showId } = req.params;

  const show = netflixData.find((show) => show.show_id === +showId);

  if (show) {
    res.json(show);
  } else {
    res.status(404).send("No show was found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
