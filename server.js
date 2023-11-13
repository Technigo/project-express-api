import express from "express";
import cors from "cors";
import airportcodes from "./data/airportcodes.json";

// Your API should have at least 3 routes. Try to push yourself to do more, though!
// The endpoint "/" should return documentation of your API using e.g. Express List Endpoints
// A minimum of one endpoint to return a collection of results (array of elements).
// A minimum of one endpoint to return a single result (single element).
// Your API should be RESTful.

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

//end point for all data in json file
app.get("/iatacodes", (req, res) => {
  res.json(airportcodes);
});

console.log(airportcodes.length); //9149

//end point for all airports listed by country code
app.get("/country/:iso_country", (req, res) => {
  const country = req.params.iso_country;
  const largeAirport = req.query.type;

  let byCountryCode = airportcodes.filter(
    (item) => item.iso_country === country
  );

  //query end point of all large airports in the country
  // if (largeAirport === "large_airport") {
  //   byCountryCode = byCountryCode.filter((item) => item.type);
  // }

  res.json(byCountryCode);
});

//end point for all airports by type
// small_airport, medium_airport, large_airport, closed
app.get("/type/:type", (req, res) => {
  const type = req.params.type;
  let byType = airportcodes.filter((item) => item.type === type);

  res.json(byType);
});

//end point to return a single result by sorting by IATA code = /iata/*iatacode

app.get("/iata/:iata_code", (req, res) => {
  const iataCode = req.params.iata_code;
  let byIata = airportcodes.filter((item) => item.iata_code === iataCode);

  res.json(byIata);

  console.log(byIata);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
