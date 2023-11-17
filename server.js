import express from "express";
import cors from "cors";
import airportcodes from "./data/airportcodes.json";
import listEndpoints from "express-list-endpoints";

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

//----- End point for all airports------//

app.get("/airports", (req, res) => {
  if (airportcodes.length >= 0) {
    res.json(airportcodes);
  } else {
    res.status(404).send("No Airport code detail were found");
  }
});

console.log(airportcodes.length); //9149

//----- End point for all airports in one country ------//

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

//----- End point for all types of airports eg. small, medium, large, closed ------//

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

//----- End point for SINGLE result for IATA code eg. /iata/JRO returns Kilimanjaro International Airport  ------//

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

//----- End point for name of airport (need to add error handling)  ------//

app.get("/airports/name/:name", (req, res) => {
  const name = req.params.name;
  let byName = airportcodes.filter((item) => item.name === name);
  res.json(byName);
});

//----- Query parameters to filter airports by type and by continent ------//
// eg. /air?type=closed OR /air?continent=oc

app.get("/air", (req, res) => {
  let queryT = req.query.type;
  let queryC = req.query.continent;

  //this code only lets you make one query on EITHER type or continent

  // if (queryT) {
  //   let typo = airportcodes.filter((item) => item.type === queryT);
  //   res.json(typo);
  // }
  // if (queryC) {
  //   let continentQ = airportcodes.filter(
  //     (item) => item.continent.toLowerCase() === queryC.toLowerCase()
  //   );
  //   res.json(continentQ);
  // }

  let results = airportcodes.filter((item) => {
    return (
      (!queryT || item.type === queryT) &&
      (!queryC || item.continent.toLowerCase() === queryC.toLowerCase())
    );
  });

  res.json(results);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
