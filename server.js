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
  res.status(200).json({ eurovisionWinners: eurovisionWinners })
})

app.get("/winners/:year", (req, res) => {
  const singleWinner = eurovisionWinners.find((w) => {
    return w.year === +req.params.year
  })
  console.log(singleWinner)
  res.status(200).json({ singleWinner })
})

app.get("/:countries", (req, res) => {
  const winningCountries = eurovisionWinners.filter((c) => {
    return c.countries.toLowerCase() === req.params.country.toLowerCase()
  })
  console.log(winningCountry)
  res.status(200).json({ winningCountry })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
