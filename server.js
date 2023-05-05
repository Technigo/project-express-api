import express from "express";
import cors from "cors";
import bikesAll from "./data/bikes.json";

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
  res.json(listEndpoints(app));
});

// Get all the bikes
app.get("/bikes", (req, res) => {
  const { type } = req.query;
  let bikes = bikesAll;

  if (type) {
    bikes = bikesAll.filter((singleBike) => {
      return singleBike.type.toLowerCase() === type.toLowerCase();
    });
  }

  if (bikes) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        bikesAll: bikes
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Oh noes... something went wrong",
      body: {}
    });
  }
});

// Get only one bike by ID
app.get("/bikes/:id", (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  const singleBike = bikesAll.find((bike) => {
   // return bike._id == id;
   // return bike._id === Number(id);
   // return bike._id === +id;
  return bike._id.toString() === id;
  });
  if (singleBike) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        bike: singleBike
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bike not found",
      body: {}
    });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



/* app.get('/nominations', (req, res) => {
  res.json(data)
 })
 
 app.get('/year/:year', (req, res) => {
   const year = req.params.year
   const showWon = req.query.won
   console.log(showWon)
   let nominationsFromYear = data.filter((item) => item.year_award === +year)
 
   if (showWon) {
     nominationsFromYear = nominationsFromYear.filter((item) => item.win)
   }
   res.json(nominationsFromYear)
 }) */