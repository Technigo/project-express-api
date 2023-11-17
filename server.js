import express from "express";
import cors from "cors";
import airportcodes from "./data/airportcodes.json";
import listEndpoints from "express-list-endpoints";

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
  res.send(listEndpoints(app));
});

//end point for all data in json file
app.get("/airports", (req, res) => {
  if (airportcodes.length >= 0) {
    res.json(airportcodes);
  } else {
    res.status(404).send("No Airport code detail were found");
  }
});

console.log(airportcodes.length); //9149

//end point for all airports listed by country code
app.get("/airports/country/:iso_country", (req, res) => {
  const country = req.params.iso_country.toLowerCase();

  let byCountryCode = airportcodes.filter(
    (item) => item.iso_country.toLowerCase() === country
  );

  if (byCountryCode.length >= 0) {
    res.json(byCountryCode);
  } else {
    res.status(404).send("No Country details were found");
  }
});

//end point for all airports by type eg /type/small_airport returns all small airports
// options are small_airport, medium_airport, large_airport, closed
app.get("/airports/type/:type", (req, res) => {
  const type = req.params.type;
  let byType = airportcodes.filter((item) => item.type === type);

  if (byType.length >= 0) {
    res.json(byType);
  } else {
    res
      .status(404)
      .send(
        "No type recognised or found. Please try again using small, medium, large or closed details were found"
      );
  }
});

//end point to return a single result by sorting by IATA code eg. /iata/JRO returns Kilimanjaro International Airprot
app.get("/airports/iata/:iata_code", (req, res) => {
  const iataCode = req.params.iata_code.toLowerCase();
  let byIata = airportcodes.find(
    (item) => item.iata_code.toLowerCase() === iataCode
  );

  if (byIata) {
    res.json(byIata);
  } else {
    res.status(404).send("No Airport was found");
  }
});

//difference between filter and find??? find stops at the first match and only gives you one item back. filter can give you multiple

//End point to return the name of an Airport eg. /name/
app.get("/airports/name/:name", (req, res) => {
  const name = req.params.name;
  let byName = airportcodes.filter((item) => item.name === name);

  res.json(byName);
});

//Stretch goal - accept filters via query parameters to filter the data you return from endpoints which return an array of data.

//access the provided country and type query parameters
// ------- /airports?country=PW

// app.get("/airports", (req, res) => {
//   const continent = req.query.continent;
//   let airportSize = airportcodes.filter((item) => item.continent === continent);

//   res.json(airportSize);
// });

// Getting the request query string - type
app.get("/air", (req, res) => {
  console.log("type: " + req.query.type);
  let queryT = req.query.type;

  console.log("continent: " + req.query.continent);
  let queryC = req.query.continent;

  if (queryT) {
    let typo = airportcodes.filter((item) => item.type === queryT);
    res.json(typo);
  }
  if (queryC) {
    let continentQ = airportcodes.filter(
      (item) => item.continent.toLowerCase() === queryC.toLowerCase()
    );
    res.json(continentQ);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
