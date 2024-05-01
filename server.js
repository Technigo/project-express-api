import express from "express";
import cors from "cors";
import avocadoData from "./data/avocado-sales.json"
import expressListEndpoints from 'express-list-endpoints';

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
app.use(cors());
app.use(express.json());

// Start defining your routes here

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints)
})
 
app.get("/avocados", (req, res) => {
  res.send(avocadoData);
});

app.get("/avocados/:avocadoId", (req, res) => {
  const {avocadoId} = req.params

  const avocado = avocadoData.find (avocado => +avocadoId === avocado.id)
  
  if(avocado){
    res.json(avocado)
  } else {
    res.status (404).send ('Avocado is not found')
  }
})

app.get("/avocados/:date", (req, res) => {
  const {date} = req.params

  const avocadoDate = avocadoData.filter (item => date === item.date)

  if(avocadoDate){
     res.json(avocadoDate)
  }else {
    res.status (404).send ('Avocado is not found')
  }})

app.get("/avocados/region", (req, res) => {

  const regions = { }

  avocadoData.forEach((item) => {
    
    const regionName = item.region

    if (!regions[regionName]){
     regions[regionName] = []
    } regions[regionName].push(item)
  })
  res.json(regions)

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
