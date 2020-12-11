import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
//import booksData from "./data/books.json";

import netflixData from "./data/netflix-titles.json";
console.log(netflixData.length);
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); //makes it easier for frontend to use the API. Corrs allows API's to say where requests can come from. To add extra security
app.use(bodyParser.json()); //This allows Express to read JSON in POST requests

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello, welcome to my Netflix API");
});

app.get("/netflix", (req, res) => {
  const { type } = req.query;
  if (country) {
    const filteredNetflix = netflixData.filter(
      show => show.country === country
    );
    res.json(filteredNetflix);
  } else {
    res.json(netflixData);
  }
});

app.get("/netflix/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const netflixShow = netflixData.find(show => show.show_id === +id);
  if (netflixShow) {
    res.json(netflixShow);
  } else {
    res.json(`Netflix id: ${id} not found`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
