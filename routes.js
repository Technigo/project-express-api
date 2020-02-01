import express from 'express';
import path from 'path';
import Joi from 'joi';
import netflixData from './data/netflix-titles.json';

const router = express.Router();
const ITEMS_PER_PAGE = 20;
let remainingPages = null;
let totalPages = null;
let movies = netflixData;

// GET routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/movies', (req, res) => {
  const queryPage = +req.query.page;
  const queryYear = +req.query.year;
  const queryDuration = +req.query.duration;
  const queryActor = req.query.actor;

  // Local copy of movies
  let filteredMovies = movies;

  // Query - Year
  if (queryYear) {
    filteredMovies = filteredMovies.filter(
      movie => movie.release_year === queryYear
    );
  }

  // Query - Actor
  if (queryActor) {
    filteredMovies = filteredMovies.filter(movie => {
      let actors = movie.cast.split(', ');

      // Check if current movie contains value in queryActor
      const result = actors.filter(item => {
        // Create regular expression with dynamic parameter
        let regexp = new RegExp(
          '\\b(' + queryActor.toLowerCase() + ')\\b',
          'gi'
        );

        // Check for match
        const match = item.toLowerCase().match(regexp);

        // If actor is present in current movie item is returned
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

  // Query - Duration
  if (queryDuration) {
    filteredMovies = filteredMovies.filter(movie => {
      const duration = movie.duration.split(' ');
      if (
        +duration[0] === queryDuration &&
        duration[1].toLowerCase() !== 'seasons'
      ) {
        return movie;
      }
    });
  }

  // Query - Page
  if (queryPage) {
    const startIndex = queryPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE; // Page 1 starts at index 0
    const endIndex = startIndex + ITEMS_PER_PAGE;
    console.log('Page: ', queryPage);
    console.log('startIndex: ', startIndex);
    console.log('endIndex: ', endIndex);
    totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
    remainingPages = totalPages - queryPage;
    console.log('Remaining pages: ', remainingPages);
    filteredMovies = filteredMovies.slice(startIndex, endIndex);
    console.log('Sliced array length: ', filteredMovies.length);
  }

  // console.log('Array length: ', filteredMovies.length);

  if (filteredMovies.length > 0) {
    if (totalPages === null && remainingPages === null) {
      totalPages = 1;
      remainingPages = 0;
    }

    res.json({
      status: '200 OK',
      message: 'Movies fetched successfully',
      totalPages: totalPages,
      remainingPages: remainingPages,
      query: req.query,
      data: filteredMovies
    });
    totalPages = remainingPages = null;
  } else {
    res.status(404).send({
      status: '404 Not Found',
      message: 'No movies found',
      query: req.query
    });
  }
});

router.get('/movies/:id', (req, res) => {
  const id = +req.params.id;
  const movie = movies.find(item => item.show_id === id);

  if (!movie) {
    res.status(404).send({
      status: '404 Not Found',
      message: `No movie found with id ${id}.`,
      params: req.params
    });
  }

  res.json({
    status: '200 OK',
    message: 'Movie fetched successfully',
    data: movie
  });
});

// DELETE routes
router.delete('/movies/:id', (req, res) => {
  const id = +req.params.id;
  const movie = movies.find(item => item.show_id === id);

  if (movie) {
    movies = movies.filter(item => item.show_id !== id);
    res.json({
      status: '200 OK',
      message: 'Movie deleted successfully',
      data: movie
    });
  } else {
    res.status(404).send({
      status: '404 Not Found',
      message: `No movie found with id ${req.params.id}.`
    });
  }
});

// POST routes
router.post('/movies', (req, res) => {
  const { body } = req;

  // Validate request bodyy
  const { error, value } = validateMovie(body);

  if (error) {
    delete error.isJoi;

    // Send a 422 error response when validation fails
    res.status(422).json({
      status: '422 Unprocessable Entity',
      message: 'Invalid request data',
      error: error
    });
  } else {
    // Create random movie id
    const show_id = randomIntFromInterval(10000000000000, 90000000000000);

    // Create movie object
    const createdMovie = {
      show_id,
      ...value
    };

    // Add movie to array
    movies.push(createdMovie);

    // Send a success response when validation succeeds
    res.json({
      status: '200 OK',
      message: 'Movie created successfully',
      data: createdMovie
    });
  }
});

// PUT route
router.put('/movies/:id', (req, res) => {
  const { body } = req;
  const { id } = req.params;

  if (!Number.isInteger(+id)) {
    res.status(400).send({
      error: '400 Bad Request'
    });
  }

  // Find movie object to update
  const movie = movies.find(item => item.show_id === +id);

  // If movie does not exist, return 404
  if (!movie) {
    res.status(404).send({
      error: '404 Not Found',
      message: `No movie found with id ${+id}.`
    });
  }

  // Destructure show_id to use in updated object
  const { show_id } = movie;

  // Find index of movie object to update
  const index = movies.findIndex(item => item.show_id === show_id);

  // Validate request body
  const { error, value } = validateMovie(body);

  if (error) {
    // Removing property
    delete error.isJoi;

    // Send a 422 error response when validation fails
    res.status(422).json({
      status: '422 Unprocessable Entity',
      message: 'Invalid request data',
      error: error
    });
  } else {
    // Create updated movie object
    const updatedMovie = {
      show_id,
      ...value
    };

    // Replace existing movie object with updated movie object
    movies.splice(index, 1, updatedMovie);

    // Send a success response when validation succeecds
    res.json({
      status: '200 OK',
      message: 'Movie updated successfully',
      data: updatedMovie
    });
  }
});

/**
 * @description validates a movie object against a predefined schema
 * @parameters movie object to be validated
 * @return value and error object
 */
const validateMovie = movie => {
  // Define movie validation schema
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

  // Validate movie object against the schema
  return Joi.validate(movie, schema);
};

/**
 * @description creates random id for movie object
 * @parameters min and max to define number range
 * @return id
 */
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = router;
