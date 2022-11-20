import express, { request, response } from "express";
import cors from "cors";
import technigomembers from "./data/technigo-members";
import topMusicData from "./data/top-music.json";
import listEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";

// import netflixData from "./data/netflix-titles.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT envornmental variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
	res.json({musicMessgae: " Welcome to Top Music Data API", data: listEndpoints(app)});
});


//Creates a new endpoint with collection of all  Top music Data
app.get("/music", (req, res) => {
	res.status(200).json({topMusicData: topMusicData, success: true});
});
//Creates a new endpoint with all artists in alphabetic order
app.get("/music/artists/", (req, res) => {
  const allArtists = topMusicData.map((item) => item.artistName).sort();
	console.log(allArtists);
	res.status(200).json(allArtists);
});
//Shows just one item in Top Music, depending on id-input.
app.get("/music/:id", (req, res) => {
  const id = req.params.id
  const musicId = topMusicData.find((item) => item.id === +id)

  //404
  if (!musicId) {
    res.status(404).json({ errorMessage: "No globe with this id found. Try to find the right id" })
  }
  res.json(musicId)
})

  //Creates a new endpoint with all artists in alphabetic order
app.get("/music/artists/:oneArtist", (req, res) => {
  const oneArtist = req.params.oneArtist
  const artistInput = topMusicData.find((item) => item.artistName === oneArtist)
//404
if (!artistInput) {
  res.status(404).json({ errorMessage: "No artist with this name found. Try to find the right name" })
}
res.json(artistInput)
});


// Start the server.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

