import express from "express";
import cors from "cors";
import data from "./data/seattle-restaurants.json";

const formatText = (result) => {
  return result
    .toString()
    .toLowerCase()
    .replace(/[\W_]+/g, "");
};

const paginateResults = (data, req) => {
  data = data.sort((a, b) => Number(b.Stars_count) - Number(a.Stars_count));
  const page = req.query.page ? req.query.page : 1;
  const size = req.query.pageSize ? req.query.pageSize : 10;
  const start = (page - 1) * size;
  const end = start + size;

  return {
    success: true,
    total: data.length,
    pages: Math.ceil(data.length / size),
    startIndex: 1,
    currentPage: page,
    pageSize: size,
    orderedBy: "popularity",
    results: data.slice(start, end),
  };
};

const orderData = (data, sorting) => {
  switch (sorting) {
    case "cheapest":
      data = data.sort((a, b) => formatText(a.Price.length) - formatText(b.Price.length));
    case "priciest":
      data = data.sort((a, b) => formatText(b.Price.length) - formatText(a.Price.length));
    case "popular":
      data = data.sort((a, b) => Number(b.Stars_count) - Number(a.Stars_count));
    case "unpopular":
      data = data.sort((a, b) => Number(a.Stars_count) - Number(b.Stars_count));
    default:
      data = data;
  }
  return data;
};

const port = process.env.PORT || 8080; //defines the port the app will run on
const app = express();

app.use(cors()); //middlewares to enable cors and json body parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Seattle restaurants");
});

app.get("/restaurants", (req, res) => {
  res.json(paginateResults(data, req));
});

app.get("/restaurants/:name", (req, res) => {
  const { name } = req.params;
  const namedRestaurant = data.find((item) => formatText(item.Name) === formatText(name));

  namedRestaurant
    ? res.status(200).json({
        success: true,
        results: namedRestaurant,
      })
    : res.status(404).json({
        success: false,
        results: "Not found",
      });
});

app.get("/neighborhoods", (req, res) => {
  const neighborhoods = [...new Set(data.map((item) => item.Area))].sort();
  res.status(200).json({
    success: true,
    total: neighborhoods.length,
    results: neighborhoods,
  });
});

app.get("/neighborhoods/:neighborhood", (req, res) => {
  const { neighborhood } = req.params;
  const neighborhoodResults = data.filter(
    (item) => formatText(item.Area) === formatText(neighborhood)
  );
  res.status(200).json(paginateResults(neighborhoodResults, req, res));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
