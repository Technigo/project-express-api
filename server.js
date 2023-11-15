import express from "express";
import cors from "cors";
import data from "./data/json_award.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/novel_award", (req, res) => {
  res.status(200).send({ status: 200, length: data.length, data: { data } });
});

app.get("/api/v1/novel_award/year/:year", (req, res) => {
  const awardYear = req.params.year;
  const items = data.filter((obj) => obj.awardYear === awardYear);
  res.status(200).send({ status: 200, length: items.length, data: { items } });
});

app.get("/api/v1/novel_award/laureates/:id", (req, res) => {
  const id = req.params.id;
  const item = data.find((obj) => obj.laureates.find((p) => p.id === id));
  res.status(200).send({ status: 200, length: item.length, data: { item } });
});

app.get("/api/v1/novel_award/category/:category", (req, res) => {
  const category = req.params.category;
  const items = data.filter((obj) => obj.category.en.toLowerCase() === category);
  res.status(200).send({ status: 200, length: items.length, data: { items } });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
