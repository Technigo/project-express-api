import express from "express";
import cors from "cors";
import getEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!

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
  res.send(getEndpoints(app));
});

// Query params
app.get("/shows", (req, res) => {
  const { cast, director } = req.query;
  let queriedShowsDetails = netflixData;

  if (cast) {
    queriedShowsDetails = queriedShowsDetails.filter((item) =>
      item.cast.toLocaleLowerCase().includes(cast.toLocaleLowerCase())
    );
  }

  if (director) {
    queriedShowsDetails = queriedShowsDetails.filter((item) =>
      item.director.toLocaleLowerCase().includes(director.toLocaleLowerCase())
    );
  }

  res.status(200).json({
    data: queriedShowsDetails,
    success: true,
  });
});

// Path params
app.get("/shows/title/:title", (req, res) => {
  const { title } = req.params;

  const showByTitle = netflixData.find((item) => item.title === title);

  if (showByTitle) {
    res.status(200).json({ data: showByTitle, success: true });
  } else {
    res.status(404).json({ data: "not found", success: false });
  }
});

app.get("/shows/country/:country", (req, res) => {
  const { country } = req.params;

  const showByCountry = netflixData.filter(
    (item) => item.country.toLocaleLowerCase() === country.toLocaleLowerCase()
  );

  res.status(200).json({ data: showByCountry, success: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
