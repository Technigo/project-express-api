import express from 'express';
import path from 'path';
import Joi from 'joi';
import uuid from 'uuid/v4';
import netflixData from './data/netflix-titles.json';

let movies = netflixData;
let show_id = 100000000000;
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

  if (!movie) res.status(404).send(`No movie found with id ${id}.`);

  res.json(movie);
});

// DELETE routes
router.delete('/movies/:id', (req, res) => {
  const id = +req.params.id;
  const movie = movies.find(item => item.show_id === id);

  if (movie) {
    movies = movies.filter(item => item.show_id !== id);
    // console.log(movie);
    res.json({
      status: 'success',
      message: 'Movie deleted successfully',
      data: movie
    });
  } else {
    res.status(404).send(`No movie found with id ${id}.`);
  }
});

// POST routes
router.post('/movies', (req, res) => {
  const payload = req.body;

  // const payload = {
  //   title: 'Microsoft Horror',
  //   director: 'Bill gates',
  //   cast: 'Val Kilmer, Tom Cruise',
  //   country: 'USA',
  //   date_added: 'January 28, 2020',
  //   release_year: 2020,
  //   rating: 'TV-20',
  //   duration: '120 min',
  //   listed_in: 'Horror movies',
  //   description: 'To big to describe in a few words.',
  //   type: 'Movie'
  // };

  // Validate payload
  const { error, value } = validateMovie(payload);

  if (error) {
    delete error.isJoi;

    // Send a 422 error response if validation fails
    res.status(422).json({
      status: 'error',
      message: 'Invalid request data',
      error: error
    });
  } else {
    // Create a random id
    // const show_id = uuid();
    show_id = randomIntFromInterval(10000000000000, 90000000000000);

    // Update array with new movie
    const newMovie = {
      show_id,
      ...value
    };

    movies.push(newMovie);
    // console.log(newMovie);

    // Send a success response if validation passes
    res.json({
      status: 'success',
      message: 'Movie created successfully',
      data: newMovie
      // data: Object.assign({ show_id }, value)
    });
  }

  // Define validation schema
  // const schema = Joi.object().keys({
  //   title: Joi.string()
  //     .trim()
  //     .regex(/^[a-zA-Z, ]*$/, 'Letters, space and comma characters')
  //     .min(2)
  //     .max(20)
  //     .required(),
  //   director: Joi.string()
  //     .trim()
  //     .required(),
  //   cast: Joi.string()
  //     .trim()
  //     .required(),
  //   country: Joi.string()
  //     .trim()
  //     .required(),
  //   date_added: Joi.string()
  //     .trim()
  //     .required(),
  //   release_year: Joi.number()
  //     .integer()
  //     .required(),
  //   rating: Joi.string()
  //     .trim()
  //     .required(),
  //   duration: Joi.string()
  //     .trim()
  //     .required(),
  //   listed_in: Joi.string()
  //     .trim()
  //     .required(),
  //   description: Joi.string()
  //     .trim()
  //     .required(),
  //   type: Joi.string()
  //     .trim()
  //     .required()
  // });

  // Validate data request against the schema
  // Joi.validate(payload, schema, (err, value) => {
  //   // Create a random id
  //   const show_id = uuid();

  //   if (err) {
  //     // Send a 422 error response if validation fails
  //     res.status(422).json({
  //       status: 'error',
  //       message: 'Invalid request data',
  //       data: data
  //     });
  //   } else {
  //     // Send a success response if validation passes
  //     res.json({
  //       status: 'success',
  //       message: 'Movie created successfully',
  //       data: Object.assign({ show_id }, value)
  //     });
  //   }
  // });
});

// PUT routes
router.put('/movies/:id', (req, res) => {
  const payload = req.body;
  const movie = movies.find(item => item.show_id === +req.params.id);

  // If movie does not exist, return 404
  if (!movie) res.status(404).send(`No movie found with id ${+req.params.id}.`);

  // Destructure show_id from movie to use in return response
  const { show_id } = movie;

  // const payload = {
  //   title: 'Microsoft',
  //   director: 'Bill Gates',
  //   cast: 'Val Kilmer, Tom Cruise',
  //   country: 'USA',
  //   date_added: 'January 28, 2020',
  //   release_year: 2020,
  //   rating: 'TV-20',
  //   duration: '120 min',
  //   listed_in: 'Horror movies',
  //   description: 'To big to describe in a few words.',
  //   type: 'Movie'
  // };

  // Validate payload
  const { error, value } = validateMovie(payload);

  if (error) {
    delete error.isJoi;

    // Send a 422 error response if validation fails
    res.status(422).json({
      status: 'error',
      message: 'Invalid request data',
      error: error
    });
  } else {
    // Update movie properties
    const updatedMovie = {
      show_id,
      ...value
    };

    // Send a success response if validation passes
    res.json({
      status: 'success',
      message: 'Movie updated successfully',
      data: updatedMovie
      // data: Object.assign({ show_id }, value)
    });
  }
});

const validateMovie = movie => {
  // Define validation schema
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .trim()
        .regex(/^[a-zA-Z, ]*$/, 'Letters, space and comma characters')
        .min(2)
        .max(20)
        .required(),
      director: Joi.string()
        .trim()
        .min(2)
        .max(30)
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
      release_year: Joi.number()
        .integer()
        .min(1900)
        .max(2020)
        .required(),
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
    })
    .options({ abortEarly: false });

  // Validate data request against the schema
  return Joi.validate(movie, schema);
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = router;
