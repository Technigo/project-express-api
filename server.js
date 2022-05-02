import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixDatas from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import members from './data/technigo-members.json'

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
  res.send("This is my API");
});

app.get("/netflixStreams", (req, res) => {
  res.status(200).json(netflixDatas)
})

app.get('/netflixStreams/:type', (req, res) => {
  const netflixTypes = netflixDatas.filter(
  (netflixData) => netflixData.type === req.params.type
  )
  res.status(200).json(netflixTypes)
  })

app.get('/year/:release_year', (req, res) => {
  const releaseYear = netflixDatas.filter(
    (netflixData) => netflixData.release_year === +req.params.release_year
  )
  res.status(200).json(releaseYear)
})

app.get('/name/:title', (req, res) => {
  const netflixTitle = netflixDatas.find(
  (netflixData) => netflixData.title === req.params.title
  )
  res.status(200).json(netflixTitle)
  })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



////////////////////////////////////////////////////////////

// // Getting the entire data structure
// app.get('/members', (req, res) => {

  // //  We are using json 99% of the times. json sends an array of objects or an object, so that the frontend can unpack it.
  // res.status(200).json(members)
  
  // send is more universal, can send all different type of data.
  // res.send()
  // })
  
  // // Getting one specific object sorted by the name in the params.
  // app.get('/members/:name', (req, res) => {
  // const memberByName = members.find(
  // (member) => member.name === req.params.name
  // )
  
  // res.status(200).json(memberByName)
  // })