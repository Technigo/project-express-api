import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import netflixData from './data/netflix-titles.json'

const ERROR_DATA_NOT_FOUND = {error: 'No data found'};

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
  res.send('Api endpoints: /shows && /shows/:id && /shows/year/:year && ?type=Movie || ?listed= Dramas')
})

//the entire array of data / http://localhost:8081/shows/
app.get('/shows', (req, res) => {
  res.json(netflixData);  
})

//point to single object id / http://localhost:8081/shows/81193313
app.get('/shows/:id/', (req, res) => {
  const { id } = req.params;

  let showId = netflixData.find(
    (item) => item.show_id === +id);

  if(!showId) {
    res.status(404).json(ERROR_DATA_NOT_FOUND)
  } else {
    res.json(showId);
  }
})


//point to year and search type of show or "listed as" for that specific year /
// http://localhost:8081/shows/year/2019?type=movie http://localhost:8081/shows/year/2019?type=tv%20show need to write reg ex / http://localhost:8081/shows/year/2019?listed=dramas
app.get('/shows/year/:year/', (req, res) => {
  const { year } = req.params;
  const { type, listed } = req.query;

  let showReleaseYear = netflixData.filter(
    (item) => +item.release_year === +year 
  );

  
    if(type) {
      showReleaseYear = showReleaseYear.filter(
        (item) => item.type.toLowerCase() === type.toLowerCase());
    };

    if(listed) {
      showReleaseYear = showReleaseYear.filter(
        (item) => item.listed_in.toLowerCase() === listed.toLowerCase())
    }

  if(year && showReleaseYear.length === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND);
  } 

  if(type && showReleaseYear.lenght === 0) {
    res.status(404).json(ERROR_DATA_NOT_FOUND);
  }

    if(listed && showReleaseYear.lenght === 0) {
      res.status(404).json(ERROR_DATA_NOT_FOUND);

  } else {
    res.json(showReleaseYear)
  }

//   Suggested endpoints: point to country and search for director or cast
//   app.get('/shows/country/:origin', (req, res) => {
//     const { origin } = req.params;
    // const { director, cast } = req.query;
    //find method

    //point to all shows and return director
    // app.get('/shows/:director', (req, res) => {
    //   const { director } = req.params;
    // })
  
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
