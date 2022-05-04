import express, { request, response } from 'express';
import cors from 'cors';
import goldenGlobesData from './data/golden-globes.json';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
	res.send('Golden Globe Winners');
});

//Fetches data from the API//
app.get('/goldenGlobes', (req, res) => {
	res.status(200).json(goldenGlobesData);
});

//Films by year//
app.get('/goldenGlobes/year_award/:year_award', (req, res) => {
	const filmByYear = goldenGlobesData.find(
		(goldenGlobes) => goldenGlobes.year_award === req.params.year_award
	);
	if (!goldenGlobesData) {
		res.status(404).json('Not found');
	} else {
		res.status(200).json({ data: filmByYear, success: true });
	}
});

//Shows specific film and if it won or not//
app.get('/goldenGlobes/win/:showName', (req, res) => {
	const showName = req.params.showName;

	let goldenGlobesWinners = goldenGlobesData.find(
		(item) => item.nominee === showName
	);
	res.status(200).json({ data: goldenGlobesWinners.win, success: true });
});

// Start the server//
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
