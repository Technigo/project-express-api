import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import netflixData from './data/netflix-titles.json'
// console.log(netflixData.length);

const ERROR_ID_NOT_FOUND = {error: 'Id not found'};
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
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Api endpoints')
})

//the entire array of obejcts / http://localhost:8080/shows/
app.get('/shows', (req, res) => {
  res.json(netflixData);  
})

//point to single object id / http://localhost:8080/shows/81193313
app.get('/shows/:id', (req, res) => {
  const { id } = req.params.id;
  let showId = netflixData.find((item) => item.show_id === +id);
  // console.log(showId);

  if(showId) {
    res.json(showId);
  } else {
    res.status(404).json(ERROR_ID_NOT_FOUND)
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
