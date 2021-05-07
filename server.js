import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Functions
const divideShows = (showsArray, pageNumber) => {
  showsArray = showsArray.slice(pageNumber * 10, (pageNumber + 1) * 10);
  return showsArray;
};

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/shows", (req, res) => {
  const { year, type, director, cast, page } = req.query;
  let queriedShows = netflixData;

  if (year) {
    queriedShows = queriedShows.filter((show) => show.release_year === +year);
  }
  if (type) {
    queriedShows = queriedShows.filter(
      (show) => show.type.toLowerCase() === type.toLowerCase()
    );
  }
  if (director) {
    queriedShows = queriedShows.filter(
      (show) => show.director.toLowerCase() === director.toLowerCase()
    );
  }
  if (cast) {
    queriedShows = queridShows.filter(
      (show) => show.cast.toLowerCase() === cast.toLowerCase()
    );
  }
  quiredShow
    ? res.status(200).json({ data: divideShows(queriedShows, +page) })
    : res.status(404).json({ error: "Not found" });
});

app.get("/shows/:id", (req, res) => {
  const { id } = req.params;

  const quiredShow = netflixData.find((show) => show.show_id === +id);
  quiredShow
    ? res.status(200).json({ data: quiredShow })
    : res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
