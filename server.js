import express, { query } from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import avocadoSalesData from "./data/avocado-sales.json";


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import goldenGlobesData from "./data/golden-globes.json";
// import booksData from "./data/books.json";
// import topMusicData from "./data/top-music.json";
// import netflixData from "./data/netflix-titles.json";
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
   res.json({
      responseMessage: "This is API for avocado sales data endpoints year 2015",
      data: listEndpoints(app)
    })
});

app.get("/avocadosales", (req, res) => {
  res.status(200).json({
    avocadoSalesData: avocadoSalesData,
    success: true
  });
});

app.get("/avocadosales/:region", (req, res) => {
  const region = req.params.region;
  const avocadoRegion = avocadoSalesData.filter(
    (item) => item.region.toLowerCase() === region.toLowerCase()
    );
    if (avocadoRegion.length !==0) {
      res.status(200).json({ data: avocadoRegion, success: true });
    } else {
      res.status(404).send("Region not found")
    }
  });
  
app.get("/regions", (req, res) => {
  const regionsList = avocadoSalesData.map((data) => data.region);
  const regions = [...new Set(regionsList)];

    res.status(200).json({ data: regions, success: true });
  });


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
