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
  const movies = {
  Welcome: "Hi! This a Netflix Api",
  Routes: [{
    "/titles": "Get movie titles",
    "/titles/id/'number'": "Get movie titles with matching id."
  }]
}
  res.send(movies);
});

// Router for titles
app.get("/titles", (req,res) => {
 res.json(netflixData)
});

// Router for Id
app.get("/titles/id/:id", (req, res) => {
  const id = req.params.id
  const displayId = netflixData.find((movie) => movie.show_id === +id)

  if(!displayId) {
    res.status(404).send("Not Found")
  } else {
    res.status(200).send(displayId)
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
