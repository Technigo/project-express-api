import listEndpoints from "express-list-endpoints";
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

// Middleware that checks if the user has a key to the API
app.use((req, res, next) => {
  if (req.query.key === "secret-key") {
    next()
  } else {
    res.status(401).json({ message: "Invalid key" });
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.get("/shows", (req, res) => {
  const type = req.query.type;
  const rating = req.query.rating;

  let shows = netflixData;

  if (type) {
    shows = shows.filter((s) => s.type === type);
  }

  if (rating) {
    shows = shows.filter((s) => s.rating === rating);
  }

  res.json(shows);
});

app.get("/shows/:showId", (req, res) => {
  const showId = parseInt(req.params.showId);
  const show = netflixData.find((s) => s.show_id === showId);

  if (show) {
    res.json(show);
  } else {
    res.status(404).json({ message: "Show not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
