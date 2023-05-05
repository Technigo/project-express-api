import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import gender from "./data/gender-inequality.json";

console.log(gender.length)
// We have 195 countires in the data package

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// I imported data from Kaggle. I converted CSV to JSON and copied my json file to the folder data
// I am using data set about gender inequality
//  https://www.kaggle.com/datasets/gianinamariapetrascu/gender-inequality-index

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo lol!");
});

app.get('/inequalitydata', (req, res) => {
  res.json(gender)
})

app.get('/Rank:Rank', (req, res) => {
  const Rank = req.params.Rank
  const inequalitydataRank = data.filter((item) => item.Rank === +Rank)
  res.json(inequalitydataRank)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
