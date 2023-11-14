import express from "express";
import cors from "cors";

import legoData from "./data/lego.json";

const listEndpoints = require("express-list-endpoints");

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// Endpoint "/" to return documentation of API using Express List Endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({ endpoints });
});

// Reorder the route definitions so that the specific routes come after the more general ones. This way, specific routes will not match the more general ones and therefore all routes should work
// Dummy/empty endpoints to be used in the future
app.get("/legoThemes", (req, res) => {
  res.json({ message: "This endpoint will return an array of all the themes"});
})

app.get("/legoSets/search", (req, res) => {
  res.json({ message: "This endpoint will allow searching for Lego sets"});
})

app.put("/legoSets/update/:setId", (req, res) => {
  const setId = req.params.setId;
  res.json({ message: `This endpoint will update the Lego set ID ${setId}`});
})

app.post("/legoSets/add", (req, res) => {
  res.json({ message: "This endpoint will add a new Lego set"});
})

app.delete("/legoSets/:setId", (req, res) => {
  const setId = req.params.setId;
  res.json({ message: `This endpoint will delete the Lego set ID ${setId}`});
})

// One endpoint to handle different parameters, e.g. returning a single Lego set based on its ID or an array of Lego sets from a specific year containing fewer than a certain number of pieces 
// NOTE: creating separate routes for these led to Express treating both routes as the same as they both use pattern "/legoSets/:", which then resulted in that routes are matched in the order they are defined, meaning that the second route couldn't be reached
app.get("/legoSets/:param", (req, res) => {
  const param = req.params.param;

  // Check if param is a number, which would indicate that it's a year
  if (!isNaN(param)) {
    const year = parseInt(param, 10);

    // create a query variable to filter lego sets from a specific year containing fewer than a certain number of pieces
    const showPieces = req.query.pieces;

    // Convert the "pieces" query parameter to a number
    const maxPieces = parseInt(showPieces, 10);

    // Fetch the set with the matching ID from the data - use "let" in order to be able to filter twice
    let setsFromYear = legoData.filter((set) => set.Year === year);

    if (setsFromYear.length > 0) { 
      // Check if the "pieces" query parameter is provided
      if (showPieces) {
        // Filter sets with fewer than the specified number of pieces
        setsFromYear = setsFromYear.filter((set) => set.Pieces < maxPieces);
      }

      res.json(setsFromYear);
      // Example: to get the sets that have FEWER than 20 piecies, write in the browser: localhost:8080/legoSets/1975?pieces=20 
    } else {
      res.status(404).json({ error: `No Lego set from ${param} with fewer than ${maxPieces} pieces was found`})
    }
  }

  // If param is not a number, treat it as an ID
  const setsById = legoData.filter((set) => set.Set_ID === param); // returns a new array with elements that meet the criteria

  // Check the length of the array to determine if any Lego sets were found (otherwise, checking if "legoSet" is truthy will always return true since an array, even if empty, is truthy)
  if (setsById.length > 0) {
    res.json(setsById);
  } else {
    res.status(404).json({ error: `No Lego set with ID ${param} was found`});
  }
})

// One endpoint to return data on all lego sets
app.get("/legoSets", (req, res) => {
  res.json(legoData);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
