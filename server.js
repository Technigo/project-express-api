import express from "express";
import cors from "cors";



// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// http://localhost:8080
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});
// Get all top-music
// http://localhost:8080/top-music
app.get("/top-music",(req, res)=>{
res.json(topMusicData)
})

// Get one song on id
app.get("/top-music/:songID", (req, res) =>{
const { songID } = req.params
console.log(req.params)

const song = topMusicData.find(song => +songID === song.id)

if (song) {
res.json(song)
} else {
  res.status(404).send ('No song with that ID was found :(')
}
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
