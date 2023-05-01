import express from "express";
import cors from "cors";
import avocadoSalesData from "./data/avocado-sales.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!

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
  res.send("Hello avocados!");
});

//avocados by region
//avocados by month
//total avocados
app.get("/avocadosales", (req, res) => {
  res.json(avocadoSalesData)
})

app.get("/regions", (req, res) => {
const regions = req.query.region
const regionList = avocadoSalesData.map((sale) => sale.region)
  res.json(regionList)
})

app.get("/month", (req, res) => {
  const date = req.params.date
  const month = avocadoSalesData.includes((date) => date.date)
  res.json (month)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
