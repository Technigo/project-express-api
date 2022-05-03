import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import members from "./data/technigo-members.json";
import { json } from "express/lib/response";
import { resetWatchers } from "nodemon/lib/monitor/watch";
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
  res.send("Hello Technigo!");
});

app.get("/avocados", (req, res) => {
  res.status(200).json(avocadoSalesData);
});

//Date
app.get("/avocados/:date", (req, res) => {
  const avocadoByDate = avocadoSalesData.find(
    (dates) => dates.date === req.params.date
  );
  res.status(200).json(avocadoByDate);
});

//Region
app.get("/avocados/byregion/:region", (req, res) => {
  const avocadoByRegion = avocadoSalesData.filter(
    (region) => region.region === "Albany"
  );
  res.status(200).json(avocadoByRegion);
});

// Price < 1.0
app.get("/avocados/byaveragePrice/:averagePrice", (req, res) => {
  const avocadoAveragePrice = avocadoSalesData.filter(
    (price) => price.averagePrice < 1.0
  );
  res.status(200).json(avocadoAveragePrice);
});

// const result = words.filter((word) => word.length > 6);
// app.get("/members", (req, res) => {
//   // to print the api
//   res.status(200).json(members);
// });

// const = to look for a specific member
// app.get("/members/:name", (req, res) => {
//   const memberByName = members.find(
//     (member) => member.name === req.params.name
//   );
//   res.status(200).json(memberByName);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
