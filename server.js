import express from "express";
import cors from "cors";

import f12020Results from "./data/f1-2020-results.json";

const noOfRaces = f12020Results.MRData.RaceTable.Races.length;

const allRaceNames = f12020Results.MRData.RaceTable.Races.map((race) => ({
    race_id: race.round,
    race_name: race.raceName,
}));


const summary = {races_2020: allRaceNames};

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
    res.send(`this many number ${noOfRaces} races`);   
});

app.get("/summary", (req, res) => {
  res.json(summary);   
});

// Start the server
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running on http://localhost:${port}`);
});
