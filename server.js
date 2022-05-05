import express from "express";
import cors from "cors";
//import members from "./data/technigo-members.json";

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
  res.send("Hello MovieJunky sa sa sa!");
});

app.get("/shows", (req, res) => {
  res.status(200).json({ data: netflixData, sucess: true });
});

app.get("/shows/title/:title", (req, res) => {
  const { title } = req.params;

  const showByTitle = netflixData.find((item) => item.title === title);

  if (showByTitle) {
    res.status(200).json({ data: showByTitle, sucess: true });
  } else {
    res.status(404).json({ data: "not found", sucess: false });
  }
});

app.get("/shows/country/:country", (req, res) => {
  const { country } = req.params;

  const showByCountry = netflixData.filter(
    (item) => item.country.toLocaleLowerCase() === country.toLocaleLowerCase()
  );

  res.status(200).json({ data: showByCountry, sucees: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
