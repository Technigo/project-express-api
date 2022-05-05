import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import listEndpoints from "express-list-endpoints";
import healthyLifestyles from "./data/healthy-lifestyle-cities-2021.json";

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
  res.send(listEndpoints(app));
});

// All the cities
app.get("/healthyLifestyles", (req, res) => {
  res.status(200).json({
    data: healthyLifestyles,
    success: true,
  });
});

// Return only the city you have typed in
app.get("/healthyLifestyles/:city", (req, res) => {
  const city = req.params.city;

  const cityByName = healthyLifestyles.filter(
    (capital) => capital.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityByName) {
    res.status(404).json({
      data: "not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: cityByName,
      success: true,
    });
  }
});

//Return the city by the rank number you have typed in
app.get("/healthyLifestyles/rank/:rank", (req, res) => {
  const { rank } = req.params;

  const rankNumber = healthyLifestyles.find((number) => number.rank === +rank);

  if (!rankNumber) {
    res.status(404).json({
      data: "not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: rankNumber,
      success: true,
    });
  }
});

//Return the top contester's
app.get("/healthyLifestyles/top/sunshineHours", (req, res) => {
  const sunshineHours = healthyLifestyles.filter(
    (hours) => hours.sunshine_hours_city > 2500
  );
  if (sunshineHours.length === 0) {
    res.status(404).json("sorry no sunshine here");
  }
  res.json(sunshineHours);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
