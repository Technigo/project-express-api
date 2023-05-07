import express, { response } from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import genderData from "./data/gender-inequality.json";
import listEndpoints from "express-list-endpoints";

console.log(genderData.length)
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
// const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

// Start defining your routes here

app.get("/", (req, res) => {
//res.send("This will give you information about gender inequality in all countires!");
res.json(listEndpoints(app));
});

// get all the countries and the data 
app.get('/data', (req, response) => {
  // res.send(genderData);
  const data = genderData;
  if (data) {
    response.status(200).json({
      success: true, 
      message: "OK",
      body: {
        genderData: data
      }
    });
  } else {
    response.status(500).json({
      success: false, 
      message: "Something went wrong",
      body: {}
    });
  }
});

// get all the data based on the Rank (not all numbers available)
app.get('/data/:rank', (req, response) => {
  const singleData = genderData.find((data) => {
    const { rank } = req.params; 
    return data.Rank === Number(rank);
    // return data.Rank.toString() === id;
    // return data.Rank === +rank 
    // these are the three options available, the last one is the least professional
  });
  if (singleData) {
    response.status(200).json({
      success: true, 
      message: "OK",
      body: {
        genderData: singleData
      }
    });
  } else {
    response.status(404).json({
      success: false, 
      message: "Country not found",
      body: {}
    });
  }
});

// get the country based on the human development 
app.get('/development/:development', (req, res) => {
  const development = req.params.development
  const countriesBasedonLevel = genderData.filter((item) => 
    item.Human_development ===  development)
    res.json(countriesBasedonLevel)
})

// get the selected country
app.get('/country/:country', (req, res) => {
  const country = req.params.country
  const countryChosen = genderData.filter((item) => 
    item.Country ===  country)
    res.json(countryChosen)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
