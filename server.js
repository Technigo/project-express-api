import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
 import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json(endpoints);
});

// Shows endpoint
app.get("/shows", (req, res) => {
  res.json(netflixData)
})

// Show ID endpoint
app.get("/shows/:id", (req, res) => {
  const {id} = req.params
  const show = netflixData.find(show => show.show_id === +id)
console.log("showID:", id, typeof id)
if (show) {
  res.json(show)
} else {
  res.status(404).send("No show was found!")
}
})

// Release year endpoint
app.get("/releaseyear/:year", (req, res) => {
  const year = req.params.year
  const showsFromReleaseYear = netflixData.filter((item) => item.release_year === +year)

if (showsFromReleaseYear.length === 0) {
    return res.status(404).json({ error: "No shows found for this release year" });
  }

  res.json(showsFromReleaseYear)
})



// // Media type endpoint
// app.get("/mediatype", (req, res) => {
//   res.json(netflixData)
// })

// // Movie endpoint
// app.get("/movies", (req, res) => {
//   res.json(netflixData.type)
// })

// // TV-show endpoint
// app.get("/shows", (req, res) => {
//   res.json(netflixData)
// })



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
