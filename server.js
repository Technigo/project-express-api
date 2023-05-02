import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from './data/netflix-titles.json';
// import topMusicData from "./data/top-music.json";

console.log(netflixData.length)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send("Hello Cats!!");
});

// http://localhost:8080/shows?type=Movie&country=United%20States
// http://localhost:8080/shows?type=Movie&director=M. Night Shyamalan
app.get('/shows', (req, res) => {
  const query = req.query;
  let filteredData = netflixData;
  Object.keys(query).forEach(key => {
    filteredData = filteredData.filter(item => item[key] === query[key]);
  });
  res.json(filteredData);
});

// http://localhost:8080/year/2020 (or other years up to 2020)
app.get('/year/:year', (req,res) => {
  const year = req.params.year
  const releaseFromYear = netflixData.filter((item) => item.release_year === +year)
  const formattedReleaseFromYear = JSON.stringify(releaseFromYear, null, 2)
  res.type('json').send(formattedReleaseFromYear)
})

// http://localhost:8080/type/Movie or http://localhost:8080/type/TV Show
app.get('/type/:type', (req,res) => {
  const type = req.params.type
  const releaseFromType = netflixData.filter((item) => item.type === type)
  const formattedReleaseFromType = JSON.stringify(releaseFromType, null, 2)
  res.type('json').send(formattedReleaseFromType)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});