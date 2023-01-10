import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
import avocadoSalesData from "./data/avocado-sales.json";
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
  res.json({responseMessage: "Yay avocados!"});
});

//Shows entire avocado-sales list
app.get("/sales", (req, res) => {
const { region } = req.query;
let  sales = avocadoSalesData;

if (region) {
  sales = avocadoSalesData.filter(region => region.region === region);
}

    res.status(200).json({ avocadoSalesData: avocadoSalesData });
 }); 


//Shows sales from one object 
app.get("/sales/:id", (req, res) => {

  const singleDateSales = avocadoSalesData.find((date)=> {
    return date.id === +req.params.id;
  }) 

  res.status(200).json({singleDateSales});
});


// Shows sales from same region

app.get("/avocadosales/:region", (req, res) => {
  const region = req.params.region;
  const salesByRegion = avocadoSalesData.filter(
    (singleRegion) => singleRegion.region.toLowerCase() === region.toLowerCase()
  );
  if (salesByRegion.length !==0) {
    res.status(200).json({ data: salesByRegion, success: true});
  } else {
    res.status(404).send("Region not found")
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
