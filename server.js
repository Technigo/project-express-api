import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";

// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from "./data/netflix-titles.json" with { type: "json" };
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
  const endpoints = expressListEndpoints(app);
  res.send(endpoints);
});

app.get("/netflix-titles", (req, res) => {
  let titles = netflixData;

  if (req.query.year) {
    titles = titles.filter(
      (item) => item.release_year === parseInt(req.query.year)
    );
  }

  res.json(titles);
});

app.get("/netflix-titles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = netflixData.find((item) => item.show_id === id);

  if (title) {
    res.json(title);
  } else {
    res.status(404).json({ error: "Title not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
