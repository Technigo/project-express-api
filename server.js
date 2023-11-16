import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to get documentation of my API
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Endpoint to get all Golden Globes nominations
app.get("/nominations", (req, res) => {
  let filteredNominations = goldenGlobesData;

  const categoryFilter = req.query.category;
  if (categoryFilter) {
    filteredNominations = filteredNominations.filter((item) => item.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  res.json(filteredNominations);
});


// Endpoint to get a single nomination by ID
app.get("/nominations/:id", (req, res) => {
  const nominationId = parseInt(req.params.id);
  const nomination = goldenGlobesData.find((item) => item.year_film === nominationId);

  if (nomination) {
    res.json(nomination);
  } else {
    res.status(404).json({ error: "Nomination not found" });
  }
});

// Default route for handling unspecified routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
