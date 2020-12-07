import express, { request, response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import data from './data/games.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start Routes
app.get('/', (request, response) => {
  response.send('Hello world, my first backend project!');
});

// Show all data = Games Library 
app.get('/games',(request, response) => { 
  response.json(data)
})

// Show all favourite games
app.get('/favorites', (request, response) => {  
  const favorites = data.results.filter((game) => game.favorite)
  response.json(favorites);
})

// Shows specific game 
app.get('/games/:slug', (request, response) => {
  const slug = request.params.slug; 
  const showGame = data.results.filter((game) => game.slug === slug)
  response.json(showGame);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
