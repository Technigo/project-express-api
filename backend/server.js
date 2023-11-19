import express from "express";
import cors from "cors";

import listEndpoints from "express-list-endpoints";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const data = require("./data/award.json");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/api/v1/novel_award", (req, res) => {
  const pageNum = req.query.page;
  const dataPerPageNum = 20;
  const dataPerPage = data.slice((pageNum - 1) * dataPerPageNum, pageNum * dataPerPageNum);
  if (pageNum)
    return res.status(200).send({ status: 200, length: data.length, data: { items: dataPerPage } });

  res.status(200).send({ status: 200, length: data.length, data: { items: data } });
});

app.get("/api/v1/novel_award/year/:year", (req, res) => {
  const awardYear = req.params.year;
  const items = data.filter((obj) => obj.awardYear === awardYear);
  if (items.length === 0)
    return res.status(404).send({ status: 404, data: "No data is available" });

  res.status(200).send({ status: 200, length: items.length, data: { items } });
});

app.get("/api/v1/novel_award/laureates/:id", (req, res) => {
  const id = req.params.id;
  const item = data.find((obj) => obj?.laureates?.find((p) => p?.id === id));

  if (!item) return res.status(404).send({ status: 404, data: "No data is available" });
  res.status(200).send({ status: 200, length: item.length, data: { item } });
});

app.get("/api/v1/novel_award/category/:category", (req, res) => {
  const category = req.params.category;
  const items = data.filter(
    (obj) =>
      obj?.category?.en?.toLowerCase().replaceAll(" ", "") ===
      category.toLowerCase().replaceAll(" ", "")
  );

  if (items.length === 0)
    return res.status(404).send({ status: 404, data: "No data is available" });

  const pageNum = req.query.page;

  const dataPerPageNum = 20;
  const dataPerPage = items.slice((pageNum - 1) * dataPerPageNum, pageNum * dataPerPageNum);
  if (pageNum)
    return res.status(200).send({ status: 200, length: data.length, data: { items: dataPerPage } });

  res.status(200).send({ status: 200, length: items.length, data: { items } });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
