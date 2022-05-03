//Need to import the dependencies (like in React)
import express from "express";
import cors from "cors";
import { response } from "express";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
//import books from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixContent from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
//import members from "./data/technigo-members.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
//Row 18 where we initialise our code, and every row after starts with app.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing and is setup code, will not do anything to it
//First line tells that orogins/request are accepted by our backend.
//The second line is the unpacking of the json, and its enough with this line of code for that 
//When data come from frontend to back end we need to unpack it, just like we do on the frontend from the backend
//But in the backend we don't have to do it in every request, like in the frontend.
app.use(cors());
app.use(express.json());


// Start defining your routes here (first example of the endpoint)
app.get("/", (req, res) => {
  res.send("What to watch next?");
});
app.get("/members", (req, res) => {
  res.status(200).json(members)
})
app.get("/members/:name", (req, res) => {
  const memberByName = members.find((member) => member.name === req.params.name)

  res.status(200).json(memberByName)
})

app.get("/netflix", (req, res) => {
  res.status(200).json(netflixContent)
})

app.get("/netflix/shows", (req, res) => {
  const netflixType = netflixContent.filter((types) => types.type === "TV Show")
  res.status(200).json(netflixType)
})

app.get("/netflix/movies", (req, res) => {
  const netflixType = netflixContent.filter((types) => types.type === "Movie")
  res.status(200).json(netflixType)
})

//app.get("/netflix/bydirector/:director", (r))
app.get("/netflix/getsuggestions", (req, res) => {

  // Get movie suggestions, look up what users friends are watching and return a subset of those.
  res.status(200).json("YOu have no friends right now, sorry. Go out and make a friend instead of watching stuff.")
})

//Returns the object when a specific title is mentioned
//Need /bytitle/ so if a movie or shows have that as a title we can still find it/return
app.get("/netflix/bytitle/:title", (req, res) => {
  const netflixTitle = netflixContent.find((titles) => titles.title === req.params.title)
  res.status(200).json(netflixTitle)
})


// Start the server and is a confirmation that everything is up and running
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
