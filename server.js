import express from "express";
import cors from "cors";

import goldenGlobesData from "./data/golden-globes.json";

const expressListEndpoints = require("express-list-endpoints");

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(expressListEndpoints(app));
});

app.get("/nominations", (req, res) => {
  const { win, year_award, category } = req.query;

  let filteredNominations = goldenGlobesData;

  if (win) {
    if (win !== "true" && win !== "false") {
      return res
        .status(400)
        .json({ error: "win parameter must be 'true' or 'false'" });
    }
    filteredNominations = filteredNominations.filter(
      (nomination) => nomination.win === (win === "true")
    );
  }

  if (year_award) {
    if (+year_award < 2015 || +year_award > 2020) {
      return res.status(400).json({
        error: "Invalid year. Please enter a year between 2015 and 2020.",
      });
    }
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

    if (filteredNominations.length === 0) {
      return res.status(404).json({
        error: "No nominations found. Please enter a valid category.",
      });
    }
  }
  if (filteredNominations.length === 0) {
    return res
      .status(404)
      .json({ error: "No nominations found with chosen filters" });
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
