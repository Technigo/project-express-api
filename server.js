import express from "express";
import cors from "cors";

import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Netflix & chill!");
});

app.get("/stream", (req, res) => {
  res.status(200).json(netflixData)
});

app.get("/stream/year/:year", (req, res) => {
  const { year } = req.params;
  const streamByYear = netflixData.filter((stream => stream.release_year === +year))
  streamByYear
    ? res.status(200).json({ data: streamByYear })
    : res.status(400).json({ error: "Not found" })
})

app.get("/stream/title/:title", (req, res) => {
  const { title } = req.params;
  const streamByTitle = netflixData.find(stream => stream.title.toLowerCase() === title.toLowerCase())
  streamByTitle
    ? res.status(200).json({ data: streamByTitle })
    : res.status(400).json({ error: "Not found" })
})

app.get("/stream/type/:type", (req, res) => {
  const { type } = req.params;
  const streamByTitle = netflixData.filter(stream => stream.type.toLowerCase() === type.toLowerCase())
  streamByTitle
    ? res.status(200).json({ data: streamByTitle })
    : res.status(400).json({ error: "Not found" })
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
