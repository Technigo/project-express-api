import express from "express";
import bodyParser from "body-parser"; // wrapping and unwrapping the data from json
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import data from "./data/avocado-sales.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express(); // starting the express app here

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
// app.get takes two arguments, first argument is path, second is a callbackfunction
app.get("/", (req, res) => {
  res.send("Avocaaaaaaatooooo 🥑");
});

// show user what endpoints we have, alternative: swagger.io
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// main path with query parameter
app.get("/avocado-sales", (req, res) => {
  const { region } = req.query;

  let dataToSend = data;

  if (region) {
    dataToSend = dataToSend.filter(
      (item) => item.region.toLowerCase().indexOf(region.toLowerCase()) !== -1
    );
  }

  // if {year && id} {
  // obs to string
  // }

  // You might wonder, when should we use path params and when
  // should we use query params? It really depends on the level of
  // complexity of your application, there are no right and wrong answers.
  // I can imagine application that uses path params only for endpoint '/fundings/:id' to get company by ID, and all of the other ways to find company by different property are covered via query params as for example 'fundings?company=something&region=somethingelse'
  // On the other hand I can also imagine application that covers all of the specific path params, as 'fundings/id/:id', 'fundings/company/:company' & 'fundings/region/:region' and then still have query params endpoint 'fundings?company=something&region=somethingelse', because by path params we expect to get only one record, and by query params array of records.

  res.json({
    response: dataToSend,
    success: true,
  });
});

// add a query somewhere
// app.get("/year/:year", (req, res) => {
//   const year = req.params.year;
//   const showWon = req.query.won; //let the user add questions
//   let nominationsFromYear = data.filter((item) => item.year_award === +year); //turning string to int with +

//   if (showWon) {
//     nominationsFromYear = nominationsFromYear.filter((item) => item.win);
//   }
//   res.json(nominationsFromYear);
// });

// app.get("/avocado-sales/id/:id", when starting to overlap some endpoints
app.get("/avocado-sales/id/:id", (req, res) => {
  const { id } = req.params;
  const avocadoId = data.find((item) => item.id === +id);

  if (!avocadoId) {
    res.status(404).send("Incorrect id");
  } else {
    res.json(avocadoId);
  }
});

//using find as the region is repeated in the data
app.get("/avocado-sales/region/:region", (req, res) => {
  const { region } = req.params;
  const { month } = req.query;

  let dataToSend = data;
  const avocadoRegion = dataToSend.filter(
    (item) => item.region.toLowerCase() === region.toLowerCase()
  );

  if (!avocadoRegion.length) {
    res.status(404).json({
      response: "No region found with that name",
      success: false,
    });
    // }
    // if (month) {
    //   dataToSend = dataToSend.filter((item) =>
    //     item.date.slice(4, 7).includes(+month)
    //   );
    //   console.log(dataToSend);
  } else {
    res.status(200).json({
      response: avocadoRegion,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} whoot whoot`);
});
