import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
import bodyParser from "body-parser";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express(); //this function call will allows us to create the whole API boilerplate

// Add middlewares to enable cors and json body parsing
// Cors makes it easier to use the API, allows API's to say where the requests come from.
// bodyParser allows express to read json in post requests
app.use(cors());
app.use(bodyParser.json()); //allows us to read the bodies from the request

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("req", req);
  // console.log("res", res);
  res.send({responseMessage: "Hello! An API for netflix-titles."});
});

app.get("/shows", (req, res) => {
  //will have title, year, country, type
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
