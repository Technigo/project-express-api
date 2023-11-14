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
  res.send("Hello Emmy!");
});

app.get(`/nominations`, (req, res) => {
  res.json(goldenGlobesData);
});

app.get(`/year/:year`, (req, res) => {
  const year = req.params.year;
  const showWon = req.query.won;
  let nominationsFromYear = goldenGlobesData.filter(
    (item) => item.year_award === +year
  );

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }
  res.json(nominationsFromYear);
});

// app.get(`/category`, (req, res) => {
//   const category = req.params.category;
//   const movieCategory = goldenGlobesData.filter(
//     (item) => item.category === category
//   );
//   res.json(movieCategory);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
