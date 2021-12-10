import express from "express";
import cors from "cors";
import data from "./data/oscars.json";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Pagination so that each page shows 100 nominations per page and a query param to be able to swap page.
app.get("/", (req, res) => {
  let page = req.query.page;
  if (!page) {
    page = 0;
  }
  const start = page * 100;
  const filteredData = data.slice(start, start + 100);
  res.json(filteredData);
});

// This gets all the endpoints of the app
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// Get all of the winners in all categorys and also enables a query param which sorts after category.
app.get("/winners", (req, res) => {
  const filteredByWinners = data.filter(
    (item) => item.winner.toLowerCase() === "true"
  );
  const categoryFilter = req.query.category;
  const filteredWinnersByCategory = filteredByWinners.filter((item) => {
    if (categoryFilter) {
      return item.category.toLowerCase() === categoryFilter.toLowerCase();
    } else {
      return true;
    }
  });
  res.send(filteredWinnersByCategory);
});

app.get("/id/:id", (req, res) => {
  const id = req.params.id;
  const findByItem = data.find((item) => item.id.toLowerCase() === +id);

  if (findByItem) {
    res.status(200).json({
      response: findByItem,
      success: true,
    });
  } else {
    res.status(404).json({
      response: "No nominations found by that id, please try another!",
      success: false,
    });
  }
});

app.get("/category/:category", (req, res) => {
  const category = req.params.category;
  const filteredByCategory = data.filter((item) => {
    return (
      category.toLowerCase().replace(/\s/g, "") ===
      item.category.toLowerCase().replace(/\s/g, "")
    );
  });
  res.json(filteredByCategory);
});

app.get("/ceremony/year/:year", (req, res) => {
  const year = req.params.year;
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

app.get("/winners/:year/:category", (req, res) => {
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
