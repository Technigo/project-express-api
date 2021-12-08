import express from "express";
import cors from "cors";
import data from "./data.json";

// Port the app will run on. Defaults to 8080.
const port = process.env.PORT || 8080;
const app = express();

// Enables cors and json body parsing
app.use(cors());
app.use(express.json());

// Start route on default port
//sending a html-file as the response by using sendFile
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//the style-sheet is linked in its own route, and sent as the response using sendFile
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

// First route
app.get("/seasons", (req, res) => {
  res.json(data);
});

// Second route
app.get("/seasons/:season", (req, res) => {
  const seasonId = Number(req.params.season);

  const season = data.find((s) => s.season === seasonId);

  if (!season) {
    res.status(404).send("no season found with that id");
  } else {
    res.json(season);
  }
});

// Third route
app.get("/seasons/:season", (req, res) => {
  const seasonWinner = req.params.season;

  const season = data.find((s) => s.season === Number(seasonId));

  // 404 error if the id does not match
  if (!season) {
    res.status(404).send("no season found with that id");
  } else {
    res.json(season);
  }
});

//this is a dummy

app.get("/compute/complex", (req, res) => {
  res.json({ result: 1 + 1 });
});

// error if the path does not exist in the api, * means all other paths than the ones listed above get this message
app.get("*", (req, res) => {
  res.send(`Sorry, don't know that path`);
});

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Restful -ish
// GET seasons
// GET seasons/:id
// POST seasons/:id -> 201 CREATED
// UPDATE seasons/:id
// DELETE seasons/:id
