import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";


import f12020Results from "./data/f1-2020-results.json";

const noOfRaces = f12020Results.MRData.RaceTable.Races.length;

const allRaceNames = f12020Results.MRData.RaceTable.Races.map((race) => ({
    race_id: race.round,
    race_name: race.raceName,
}));

const uniqueDrivers = f12020Results.MRData.RaceTable.Races.flatMap((race) => {
    const arrayOfOneRace = race.Results.map((driver) => ({
        number: driver.number,
        race_initials: driver.Driver.code,
        driver_name: `${driver.Driver.familyName}, ${driver.Driver.givenName}`,
        date_of_birth: driver.Driver.dateOfBirth,
        nationality: driver.Driver.nationality,
    }));

    return arrayOfOneRace;
}).reduce((drivers, newDriver) => {
  drivers[newDriver.number] = newDriver
  return drivers
}, {})

const summary = { races_2020: allRaceNames, drivers: uniqueDrivers };

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
    res.send(listEndpoints(app))
});

app.get("/summary", (req, res) => {
    res.json(summary);
});

app.get("/race/:race_id", (req, res) => {
  const {race_id} = req.params

  const raceId = f12020Results.MRData.RaceTable.Races.find((race) => race.round === race_id)
  if (!raceId) {
    res.status(404).send("No race found")
  }
  res.json(raceId);
});

app.delete("/", (req, res) => {
  res.send("Don't be silly, you can't delete my data")
});

// Start the server
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running on http://localhost:${port}`);
});
