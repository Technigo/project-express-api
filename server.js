import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

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
    res.json(show)
  } else {
    res.status(404).json({ message: 'Show not found' })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
