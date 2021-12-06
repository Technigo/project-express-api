import express from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';

//import booksData from './data/books.json';
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'

// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//----END POINTS----
// Start defining your routes here
//endpoints to return a collection of results
app.get('/', (req, res) => {
	res.json(netflixData);
});

// endpoint to return a single result
app.get('/shows/:show_id', (req, res) => {
	const { show_id } = req.params;
	const uniqueShowID = netflixData.find((item) => item.show_id === +show_id);

	if (!uniqueShowID) {
		res.status(404).send('No shows/movies found with that ID');
	} else {
		res.json(uniqueShowID);
	}
});

app.get('/type/:type', (req, res) => {
	const type = req.params.type; //get data from the variable
	let onlyMovies = netflixData.filter((item) => item.type === 'Movie');
	res.json(onlyMovies);
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
