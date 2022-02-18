/* eslint-disable no-tabs */
import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import disneyMovies from './data/disney-movies.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Defining routes to API
app.get('/', (req, res) => {
	res.send(
		'Welcome to Beckys Disney Movie API! Go to /endpoints to see what info you can find 😎'
	);
});

// Shows all endpoints
app.get('/endpoints', (req, res) => {
	res.send(listEndpoints(app));
});

// Shows all movies
app.get('/movies', (req, res) => {
	res.json(disneyMovies);
});

// Shows specific movie title
app.get('/movies/:title', (req, res) => {
	// Path param
	const { title } = req.params;

	const movieTitle = disneyMovies.find((movie) => movie.movie_title === title);

	if (!movieTitle) {
		console.log('No movie with that title');
		res.status(404).send('No movie with that title, please try again');
	} else {
		res.json(movieTitle);
	}
});

// Shows all movies in specific genre
app.get('/genre/:genre', (req, res) => {
	const { genre } = req.params;

	const movieGenre = disneyMovies.filter((movie) => movie.genre === genre);

	if (!movieGenre) {
		console.log('No movie with that genre');
		res.status(404).send('No movie with that genre, please try again');
	} else {
		res.json(movieGenre);
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
