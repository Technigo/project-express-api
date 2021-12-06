import express from "express";
import cors from "cors";
import data from "./data/oscars.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(data);
});

app.get("/winners", (req, res) => {
  const filteredByWinners = data.filter((item) => item.winner === "TRUE");
  res.json(filteredByWinners);
});

app.get("/category/:category", (req, res) => {
  const category = req.params.category;
  const filteredByCategory = data.filter(
    (item) =>
      category.toLowerCase().replace(/\s/g, "") ===
      item.category.toLowerCase().replace(/\s/g, "")
  );
  res.json(filteredByCategory);
});

app.get("/ceremony/year/:year", (req, res) => {
  const year = req.params.year;
  console.log(year);
  const filteredByCeremonyYear = data.filter(
    (item) => item.yearCeremony === +year
  );
  res.json(filteredByCeremonyYear);
});

app.get("/ceremony/number/:number", (req, res) => {
  const number = req.params.number;
  const filteredByCeremonyNumber = data.filter(
    (item) => item.ceremony === +number
  );
  res.json(filteredByCeremonyNumber);
});

app.get("/winner/:year/:category", (req, res) => {
  const year = req.params.year;
  const category = req.params.category;
  const winner = data.filter(
    (item) =>
      item.winner === "TRUE" &&
      item.yearCeremony === +year &&
      item.category.toLowerCase().replace(/\s/g, "") ===
        category.toLowerCase().replace(/\s/g, "")
  );
  res.json(winner);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
