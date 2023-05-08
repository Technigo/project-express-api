import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

console.log(goldenGlobesData.length);

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
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // res.send("Hello Technigo!");
  res.status(200).json(listEndpoints(app));
});
// requeest and responsee - aka req and res
// this show all the data in goldenglobes.json
// example addres how to get all the nominations for example for Aaron Sorkin
// All the nominations he has got during the years:
// http://localhost:8080/nominations?nominee=aaron%20sorkin
app.get('/nominations', (req, res) => {
  const nominee = req.query.nominee;
  const filmName = req.query.film;
  let nominations = goldenGlobesData;

  if (nominee) {
    nominations = nominations.filter((item) => item.nominee.toLowerCase() === nominee.toLowerCase());
  }

  if (filmName) {
    nominations = nominations.filter((item) => item.film.toLowerCase() === filmName.toLowerCase());
  }

  if (nominations.length === 0) {
    let message = "Unfortunately, we do not have any nominations";
    if (nominee) {
      message += ` for ${nominee}`;
    }
    if (filmName) {
      message += ` for the film "${filmName}"`;
    }
    res.status(404).json({
      message: message,
      success: false,
    });
  } else {
    res.status(200).json(nominations);
  }
});



// The line app.get('/year/:year', (req, res) => { is defining a GET route in your Express application.
// app.get: This is the method used to handle a GET request. In HTTP, GET is used to request data from a specified resource.
// '/year/:year': This is the route path. The : before year signifies that year is a variable parameter.
// This means that whatever value is put in the place of :year in the URL will be accessible in the route handler function
// through req.params.year. For example, if you make a GET request to http://localhost:8080/year/2010, 
// then within your route handler, req.params.year will be '2010'.


// (req, res) => {}: This is the route handler function. It takes two parameters: req and res.
// The req object represents the HTTP request and contains properties for the request query string,
// parameters, body, HTTP headers, etc. The res object is used to send HTTP responses to the client from the server.

app.get('/year/:year', (req, res) => {
  const year = req.params.year;
  const showWon = req.query.won;
  const category = req.query.category;
  const nominee = req.query.nominee;
  const filmName = req.query.film;
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === Number(year));

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }

  if (category) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }

  if (nominee) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.nominee.toLowerCase() === nominee.toLowerCase());
  }

  if (filmName) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.film.toLowerCase() === filmName.toLowerCase());
  }

  if (nominationsFromYear.length === 0) {
    let message = `Unfortunately, we do not have any data from year ${year}`;
    if (nominee) {
      message += ` for ${nominee}`;
    }
    if (filmName) {
      message += ` for the film "${filmName}"`;
    }
    res.status(404).json({
      data: year,
      message: message,
      success: false,
    });
  } else {
    res.status(200).json(nominationsFromYear);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
