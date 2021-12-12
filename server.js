import express, { json } from "express";
import bodyParser from "body-parser"; // wrapping and unwrapping the data from json
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import data from "./data/avocado-sales.json";

// Defines the port the app will run on. Defaults to 8080, but can be
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// app.get takes two arguments, first argument is path, second is a callbackfunction
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// show user what endpoints we have
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// main path with query parameter for US state/region
app.get("/avocado-sales", (req, res) => {
  const { state } = req.query;
  let dataToSend = data;

  if (state) {
    dataToSend = dataToSend.filter(
      (item) => item.region.toLowerCase().indexOf(state.toLowerCase()) !== -1
    );
  }

  res.status(200).json({
    response: dataToSend,
    success: true,
  });
});

//GET data for a specific US State/region.
app.get("/avocado-sales/state/:state", (req, res) => {
  const { state } = req.params;

  const avocadoState = data.filter(
    (item) => item.region.toLowerCase() === state.toLowerCase()
  );

  if (!avocadoState.length) {
    res.status(404).json({
      response: "No state found with that name",
      success: false,
    });
  } else {
    res.status(200).json({
      response: avocadoState,
      success: true,
    });
  }
});

// GET data by id
app.get("/avocado-sales/id/:id", (req, res) => {
  const { id } = req.params;
  const avocadoId = data.find((item) => item.id === +id);

  if (!avocadoId) {
    res.status(404).json({
      response: "Incorrect ID",
      sucess: false,
    });
  } else {
    res.status(200).json({
      response: avocadoId,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
