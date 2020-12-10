import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import netflixData from './data/netflix-titles.json'
// console.log(netflixData.length);

const ERROR_DATA_NOT_FOUND = {error: 'Data not found'};

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8081
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Api endpoints: /shows && /shows/:id && /shows/year/:year')
})

//the entire array of objects / http://localhost:8080/shows/
app.get('/shows', (req, res) => {
  res.json(netflixData);  
})

//point to single object id / http://localhost:8080/shows/81193313
app.get('/shows/:id/', (req, res) => {
  const { id } = req.params;

  let showId = netflixData.find(
    (item) => item.show_id === +id);
  // console.log(showId);

  if(showId.length === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(showId);
  }
})


//point to year and search type / http://localhost:8081/shows/year/2011?movie
app.get('/shows/year/:year/', (req, res) => {
  const { year } = req.params;
  const { type } = req.query


  let showReleaseYear = netflixData.filter(
    (item) => +item.release_year === +year 
  );

  // let showType = showReleaseYear.filter(
  //   (item) => item.type === type
  // );

  if(year && showReleaseYear.length === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND);
  } 

  // if(!showType) {
  //   res.status(404).json(ERROR_DATA_NOT_FOUND)
  // } else {
  //   res.json(showReleaseYear)
  // }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
