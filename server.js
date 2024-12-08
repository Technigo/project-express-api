import express from "express";
import cors from "cors";

import goldenGlobesData from "./data/golden-globes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/nominations", (req, res) => {
  const { win, year_award, category } = req.query;

  let filteredNominations = goldenGlobesData;

  if (win) {
    filteredNominations = filteredNominations.filter(
      (nomination) => nomination.win
    );
  }

  if (year_award) {
    filteredNominations = filteredNominations.filter(
      (nomination) => nomination.year_award === parseInt(year_award)
    );
  }
  if (category) {
    const searchTerms = category.toLowerCase().split(" ");
    filteredNominations = filteredNominations.filter((nomination) =>
      searchTerms.every((term) =>
        nomination.category.toLowerCase().includes(term)
      )
    );
  }

  res.json(filteredNominations);
});

app.get("/nominations/:id", (req, res) => {
  const nomination = goldenGlobesData.find(
    (nomination) => nomination.id === +req.params.id
  );

  if (!nomination) {
    return res.status(404).json({ error: "Nominee not found" });
  }

  res.json(nomination);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
