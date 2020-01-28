import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import netflixData from './data/netflix-titles.json';
let movies = netflixData;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Start defining your routes here
// app.get('/', (req, res) => {
//   // res.send('Welcome to the custom Netflix data API!');
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/api/movies', (req, res) => {
  const queryPage = +req.query.page;
  const itemsPerPage = 20;
  const startIndex = queryPage * itemsPerPage - itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const queryYear = +req.query.year;
  const queryDuration = +req.query.duration;
  let queryActor = req.query.actor;

  if (queryYear) {
    movies = movies.filter(movie => movie.release_year === queryYear);
  }

  if (queryActor) {
    movies = movies.filter(movie => {
      let actors = movie.cast.split(', ');

      // Convert actor names to lowercase
      actors = actors.map(actor => {
        return actor.toLowerCase();
      });

      // Check if current movie contains value in queryActor
      const result = actors.filter(item => {
        let regexp = new RegExp(
          '\\b(' + queryActor.toLowerCase() + ')\\b',
          'gi'
        );
        const match = item.match(regexp);
        console.log(item.match(regexp));

        if (match) {
          return item;
        } else {
          return;
        }
      });

      // Return current movie if actor is found
      if (result.length > 0) {
        return movie;
      }
    });
  }

  if (queryDuration) {
    movies = movies.filter(movie => {
      const duration = movie.duration.split(' ');
      if (
        +duration[0] === queryDuration &&
        duration[1].toLowerCase() !== 'seasons'
      ) {
        return movie;
      }
    });
  }

  if (queryPage) {
    console.log('Page: ', queryPage);
    console.log('startIndex: ', startIndex);
    console.log('endIndex: ', endIndex);
    movies = movies.slice(startIndex, endIndex);
    console.log('Sliced array length: ', movies.length);
  }
  console.log('Array length: ', movies.length);
  if (movies.length > 0) {
    res.json(movies);
  } else {
    res.status(404).send('No movies found.');
  }
});

app.get('/api/movies/:id', (req, res) => {
  const id = +req.params.id;
  console.log({ year });
  const movie = movies.find(item => item.show_id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send(`No movie found with id ${id}.`);
  }
});

app.delete('/api/movies/:id', (req, res) => {
  const id = +req.params.id;
  const movie = movies.find(item => item.show_id === id);

  if (movie) {
    movies = movies.filter(item => item.show_id !== id);
    console.log(movie);
    res.json(movie);
  } else {
    res.status(404).send(`No movie found with id ${id}.`);
  }
});

app.post('/api/movies', (req, res) => {
  const movie = {
    name: req.body.name
  };

  console.log(req.body.name);
  res.send(movie);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
