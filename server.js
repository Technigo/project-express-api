import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json";
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// The cors helps us to have both frontend and backend
// to be on the local host, without having errors.
app.use(cors());
//Allows us to read the bodies from the request as a json
app.use(express.json());

// Start defining your routes here
// This is the first Get request
//The path is the slash. Is the base path in this case.
// req = request res = result
app.get("/", (req, res) => {
  //console.log("req", req);
  //console.log("res", res);
  //res.send({responseMessage: "Hello Technigo!"});
  res.json({responseMessage: "Hello Technigo!"});
});
//HTMLElement.addEventListener('nameOfTheListener', () => {

//});
app.get("/members", (req, res) => {

  res.status(200).json({technigoMembers: technigoMembers});
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
