import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from './data/netflix-titles.json';
// import topMusicData from "./data/top-music.json";

// console.log(netflixData.length)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send({responseMessage: "Get your Netflix data"});

  res.json(listEndpoints(app));
});

// Defines the root route which sends a string as a response
// The code defines an endpoint to return a collection of results
// Route takes query parameters and returns a collection of filtered data from the netflixData array.
// http://localhost:8080/shows?type=Movie&country=United%20States
// http://localhost:8080/shows?type=Movie&director=M.%20Night%20Shyamalan
app.get('/shows', (req, res) => {
  const query = req.query;
  let filteredData = netflixData;
  Object.keys(query).forEach(key => {
    filteredData = filteredData.filter(item => item[key] === query[key]);
  });

  res.status(200).json({
    success: true,
    message: 'OK',
    body: {
      netflixData: filteredData
    }
  });
});

// Defines a route that takes a parameter and returns a filtered collection of data.
// The code defines an endpoint to return a single result
// http://localhost:8080/year/2020 (or other years up to 2020)
app.get('/year/:year', (req, res) => {
  const year = req.params.year;
  const releaseFromYear = netflixData.filter((item) => item.release_year === +year);

  res.status(200).json({
    success: true,
    message: 'OK',
    body: {
      netflixData: releaseFromYear
    }
  });

});


// Defines a route that takes a parameter and returns a filtered collection of data.
// http://localhost:8080/type/Movie or http://localhost:8080/type/TV%20Show
app.get('/type/:type', (req,res) => {
  const type = req.params.type
  const releaseFromType = netflixData.filter((item) => item.type === type) 

    res.status(200).json({
    success: true,
    message: 'OK',
    body: {
      netflixData: releaseFromType
    }
  });
});

// Filters Netflix data by title and/or director
// title: 
// http://localhost:8080/netflix-data?title=dead%20to%20me

// director: 
// http://localhost:8080/netflix-data?director=M.%20Night%20Shyamalan
app.get('/netflix-data', (req, res) => {
  const { title, director } = req.query;
  let data = netflixData;

  if (title) {
    data = data.filter(item => item.title.toLowerCase() === title.toLowerCase());
  }

  if (director) {
    data = data.filter(item => item.director.toLowerCase() === director.toLowerCase());
  }

  res.status(200).json({
    success: true,
    message: 'OK',
    body: {
      netflixData: data
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});