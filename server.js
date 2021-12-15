import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

import trumpInsults from './data/trump-insults.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
	res.send(
		'Welcome to Beckys book API! Go to /endpoints to see what info you can find 😎'
	);
});

app.get('/docs', (req, res) => {
	res.send('Endpoints');
});

app.get('/insults', (req, res) => {
	res.json(trumpInsults);
});

app.get('/insults/:id', (req, res) => {
	const { id } = req.params;

	const insultId = trumpInsults.find((insult) => insult.id === +id);

	if (!insultId) {
		console.log('No insult with that ID');
		res.status(404).send('No insult with that ID, please try again');
	} else {
		res.json(insultId);
	}
});

// Endpoints
// - ID ✅
// - date
// - year
// - target/target
// - insult

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
