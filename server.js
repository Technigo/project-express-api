import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

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
  res.send("Hello Technigo!");
});

app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData)
})

app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)
  if (showWon==="true") {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  } else {
    nominationsFromYear = nominationsFromYear.filter((item) => !item.win)
  }
  res.json(nominationsFromYear)
})

app.get("/nominee/:nominee", (req, res) => {
  const nominee = req.params.nominee.toLowerCase();
  const nomineeName = goldenGlobesData.filter ((item) => item.nominee.toLowerCase() === nominee)
  res.json(nomineeName)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
