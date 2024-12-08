import express from "express";
import cors from "cors";
import awardsData from "./data/golden-globes.json";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app).map((endpoint) => ({
    path: endpoint.path,
    methods: endpoint.methods,
    middlewares: endpoint.middlewares || ["anonymous"], 
  }));

  res.json({
    message: "Welcome to the Golden Globes API!",
    endpoints: endpoints,
  });
});

app.get("/awards/winners", (req, res) => {
  const winners = awardsData.filter((award) => award.win === true);
  res.status(200).json(winners);
});

app.get("/awards", (req, res) => {
  const { year, category } = req.query;

  let filteredAwards = awardsData;

  if (year) {
    filteredAwards = filteredAwards.filter(
      (award) => award.year_award === parseInt(year, 10)
    );
  }

  if (category) {
    filteredAwards = filteredAwards.filter((award) =>
      award.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (filteredAwards.length === 0) {
    return res.status(404).json({ error: "No awards found matching the criteria" });
  }

  res.status(200).json(filteredAwards);
});

app.get("/awards/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const award = awardsData[id];

  if (award) {
    res.status(200).json(award);
  } else {
    res.status(404).json({ error: "Award not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
