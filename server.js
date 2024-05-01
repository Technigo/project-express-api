import express from "express";
import cors from "cors";

//import music data
import whoData from "./data/doctorwho.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//get all data from json file
//http://localhost:8080/doctorwho
app.get("/doctorwho", (req, res) => {
  res.json(whoData);
});

//endpoint to return a single result defined by "id"
//http://localhost:8080/doctorwho/15
app.get("/doctorwho/:doctorwhoId", (req, res) => {
  const { doctorwhoId } = req.params;
  const doctorwho = whoData.find((doctorwho) => +doctorwhoId === doctorwho.id); //+ turns string into number
  res.json(doctorwho);
});

//endpoint to return a single result defined by "air date"
//http://localhost:8080/doctorwho/airdate/2010-04-03
app.get("/doctorwho/airdate/:date", (req, res) => {
  const { date } = req.params;
  const doctorwho = whoData.find((episode) => episode.air_date === date);

  if (doctorwho) {
    res.json(doctorwho);
  } else {
    res
      .status(404)
      .json({ message: "No episode found for the given air date." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
