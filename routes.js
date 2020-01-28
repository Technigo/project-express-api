import express from 'express';
import path from 'path';
import Joi from 'joi';
import uuid from 'uuid/v4';
import netflixData from './data/netflix-titles.json';

let movies = netflixData;
const router = express.Router();

// GET routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/movies', (req, res) => {
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

router.get('/movies/:id', (req, res) => {
  const id = +req.params.id;
  // console.log({ year });
  const movie = movies.find(item => item.show_id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send(`No movie found with id ${id}.`);
  }
});

// DELETE routes
router.delete('/movies/:id', (req, res) => {
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

// POST routes
router.post('/movies', (req, res) => {
  // const data = req.body

  const data = {
    title: 'Microsoft Horror',
    director: 'Bill gates',
    cast: 'Val Kilmer, Tom Cruise',
    country: 'USA',
    date_added: 'January 28, 2020',
    release_year: 2020,
    rating: 'TV-20',
    duration: '120 min',
    listed_in: 'Horror movies',
    description: 'To big to describe in a few words.',
    type: 'Movie'
  };

  // "title": "Microsoft Horror",
  // "director": "Bill gates",
  // "cast": "Val Kilmer, Tom Cruise",
  // "country": "USA",
  // "date_added": "January 28, 2020",
  // "release_year": 2020,
  // "rating": "TV-20",
  // "duration": "120 min",
  // "listed_in": "Horror movies",
  // "description": "To big to describe in a few words.",
  // "type": "Movie"

  // Define validation schema
  const schema = Joi.object().keys({
    title: Joi.string()
      .trim()
      .regex(/^[a-zA-Z, ]*$/, 'Alphanumerics, space and comma characters')
      .min(2)
      .max(20)
      .required(),
    director: Joi.string()
      .trim()
      .required(),
    cast: Joi.string()
      .trim()
      .required(),
    country: Joi.string()
      .trim()
      .required(),
    date_added: Joi.string()
      .trim()
      .required(),
    release_year: Joi.number().required(),
    rating: Joi.string()
      .trim()
      .required(),
    duration: Joi.string()
      .trim()
      .required(),
    listed_in: Joi.string()
      .trim()
      .required(),
    description: Joi.string()
      .trim()
      .required(),
    type: Joi.string()
      .trim()
      .required()
  });

  // Validate data request against the schema
  Joi.validate(data, schema, (err, value) => {
    // Create a random id
    const id = uuid();

    if (err) {
      // Send a 422 error response if validation fails
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      });
    } else {
      // Send a success response if validation passes
      res.json({
        status: 'success',
        message: 'Movie created successfully',
        data: Object.assign({ id }, value)
      });
    }
  });
});

module.exports = router;
