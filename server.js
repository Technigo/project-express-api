import express, { response } from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

console.log(netflixData.length);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(netflixData);
});

app.get("/year/:year", (req, res) => {
  const { year } = req.params;
  const { country, genre } = req.query;
  let contentOfYear = netflixData.filter((item) => item.release_year === +year);

  if (country) {
    contentOfYear = contentOfYear.filter((item) =>
      item.country.toLocaleLowerCase().includes(country.toLocaleLowerCase())
    );
  }

  if (genre) {
    contentOfYear = contentOfYear.filter((item) =>
      item.listed_in.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    );
  }

  if (contentOfYear.length === 0) {
    res.status(404).json("Not found");
  } else {
    res.json(contentOfYear);
  }
});

app.get("/type/:type", (req, res) => {
  const { type } = req.params;
  const typeOfContent = netflixData.filter((item) => item.type === type);

  if (typeOfContent.length === 0) {
    res.status(404).send("Wrong type of content");
  } else {
    res.json(typeOfContent);
  }
});

app.get("/titles/:title", (req, res) => {
  const { title } = req.params;
  const uniqueTitle = netflixData.find((item) => item.show_id === +title);

  if (!uniqueTitle) {
    res.status(404).send("Title not found");
  } else {
    res.json(uniqueTitle);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
