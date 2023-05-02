import express from "express";
import cors from "cors";
import data from './data/golden-globes.json'

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
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); // a technology that allwos the apis to say where requests can come from to add a little bit of extra security
app.use(express.json());

// Start defining your routes here, this is the end point
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/nominations', (req,res)=>{
  res.json(data)
})

app.get('/year/:year', (req,res)=>{
   const year=req.params.year
   const showWon = req.query.won
  let nominationsFromYear = data.filter((item)=>item.year_award === +year)
  if(showWon){
    nominationsFromYear = nominationsFromYear.filter((item)=> item.win)
  }
  res.json(nominationsFromYear)
})

// Start the server that is on line 15
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
