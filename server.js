import express from "express";
import cors from "cors";
import eurovisionWinners from "./data/eurovision-winners.json"

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
  res.json("Hello Europe! Let's explore the winners from the Eurovision Song Contest throughout the years! See the entire list by adding '/winners' to this adress!");
});

app.get("/winners", (req, res) => {
  const { country, song, artist } = req.query;
  let contestants = eurovisionWinners;
  if (country) {
    contestants = contestants.filter(singleContestant => singleContestant.country.toLowerCase() === country.toLowerCase());
  }
  if (song) {
    contestants = contestants.filter(singleContestant => singleContestant.song.toLowerCase() === song.toLowerCase());
  }
  if (artist) {
    contestants = contestants.filter(singleContestant => { return singleContestant.artist.toLowerCase() === artist.toLowerCase() });
  }

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      eurovisionWinners: contestants
    }
  });
});

app.get("/winners/:year", (req, res) => {
  const singleWinner = eurovisionWinners.find((winner) => {
    return winner.year === +req.params.year
  });
  if (singleWinner) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        winner: singleWinner
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log(singleWinner);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});