import express from "express";
import cors from "cors";
import goldenGlobeData from "./data/golden-globes.json";
import bodyParser from "body-parser";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/nominations", (req, res) => {
  res.json(goldenGlobeData);
});

app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  const showWin = req.query.won;
  let nominationsFromYear = goldenGlobeData.filter(
    (item) => item.year_award === +year
  );

  if (showWin) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }
  res.json(nominationsFromYear);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
