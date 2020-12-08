import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from "./data/golden-globes.json";
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

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
app.get("/", (req, res) => {
  res.send("Hello world");
});

// This route will return a collection of shows
app.get("/shows", (req, res) => {
  const shows = netflixData;
  res.json(shows);
});

// This route will return a single show
app.get("/shows/:id", (req, res) => {
  const id = req.params.id;
  const show = netflixData.find((item) => item.show_id === +id);
  res.json(show);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
