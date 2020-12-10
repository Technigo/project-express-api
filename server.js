import express, { request, response } from 'express';
import expressEndpoints from 'express-list-endpoints';
import bodyParser from 'body-parser';
import cors from 'cors';

import data from './data/games.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const ERROR_GAME_NOT_FOUND = { error: 'No game with that name was found.' };

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start Routes
const endPoints = require('express-list-endpoints')
app.get("/", (request, response) => {
  response.send(endPoints(app));
});

// Show data = Games Library 
app.get('/games',(request, response) => { 
  response.json({
    "results": data.results.map((game) => {
      return {
        "name": game.name, 
        "slug": game.slug,
        "background_image": game.background_image 
      };
    }),
  "total": data.results.length
  })

})

// Show all favourite games
app.get('/favorites', (request, response) => {  
  const favorites = data.results.filter((game) => game.favorite)
  response.json({
    "results": favorites,
    "total": favorites.length
  });
})

// Shows specific game 
app.get('/games/:slug', (request, response) => {
  const slug = request.params.slug; 
  const showGame = data.results.find((game) => game.slug === slug)

  if (showGame.length === 0) {
    response.status(404).json(ERROR_GAME_NOT_FOUND);
  } else {
    response.json(showGame);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Dummy endpoints - Red Level Goal
// filter games by tag
// app.get('games/tag');

// filter games by playing platform 
// app.get('games/platform')

//filter games by rating
// app.get('games/rating')
