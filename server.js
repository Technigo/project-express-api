import express, { request, response } from 'express';
import cors from 'cors';
import goldenGlobesData from './data/golden-globes.json';
import { Route } from 'react-router-dom';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

//From Maksy mon//
//fetch

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
	res.send('Hello Bajs!!');
});

//From Maksy mon//
app.get('/goldenGlobes', (req, res) => {
	res.status(200).json(goldenGlobesData);
});

app.get('/goldenGlobes/:year', (req, res) => {
	const filmByYear = goldenGlobes.find(
		(goldenGlobes) => goldenGlobes.year === req.params.year
	);
	res.status(200).json(filmByYear);
});

app.get('/nominations', (req, res) => {
	res.json(data);
});

app.get('/year/:year', (req, res) => {
	const year = req.params.year;
	const showWon = req.query.won;
	let nominationsFromYear = data.filter((item) => item.year_award === +year);

	if (showWon) {
		nominationsFromYear = nominationsFromYear.filter((item) => item.win);
	}

	res.json(nominationsFromYear);
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
