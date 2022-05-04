import express from "express";
import cors from "cors";
import members from "./data/technigo-members.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
// express prepares app, after all starts with app here below
const app = express();

// Add middlewares to enable cors and json body parsing
// now app accepts all origins
app.use(cors());
//backend unpacking json to digestible javascript spacesuit/spaceship
app.use(express.json());

// Start defining your routes here
// first endpoint 
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//frist argument is end url and second is express callback
//request is the info comes to backend when send req from frontend 
//response send back path  to frontend after executing stuff 
//pingpong frontend starts game, this is like the eventlistener function
//send makes us able transferr all kinds of data to send
//json always send json data but we will mostly use
//express use 200 as default
app.get("/members", (req, res) => {
res.status(200).json(members)
});

//express cant use /members again, needs to beunique since start up and down
//path params looks like slug dynamic ids from route, in url we can typ Mathilda now
app.get("/members/:name", (req, res) => {
  // console.log(req.params)
  const memberByName = members.find(
    (member) => member.name === req.params.name)

  res.status(200).json(memberByName)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
