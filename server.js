import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import members from './data/technigo-members.json'

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
  res.send("Hello Technigo!");
});

// Getting the entire data structure
app.get('/members', (req, res) => {
// We are using json 99% of the times. json sends an array of objects or an object, so that the frontend can unpack it.
res.status(200).json(members)

// send is more universal, can send all different type of data.
// res.send()
})

// Getting one specific object sorted by the name in the params.
app.get('/members/:name', (req, res) => {
const memberByName = members.find(
(member) => member.name === req.params.name
)

res.status(200).json(memberByName)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
