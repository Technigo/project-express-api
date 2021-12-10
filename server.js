import express, { response } from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';
import listEndpoints from 'express-list-endpoints';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//----ENDPOINTS----

//root endpoint
app.get('/', (req, res) => {
	res.send(
		"Hello World ✨, welcome to Madelene's Netflix shows API - see this API live at 👉: https://mt-dotse-netflix-titles.netlify.app/ "
	);
});

//showing all the possible enpoints in the app
app.get('/endpoints', (req, res) => {
	res.send(listEndpoints(app));
});

//----COLLECTION OF RESULT------
// endpoint to show all the Netflix titles
// query params to filter and get collections of results
app.get('/shows', (req, res) => {
	const { type, country, release, cast, genre, director } = req.query;

	//variables for pagination
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	let netflixShowsToSend = netflixData;

	if (type) {
		netflixShowsToSend = netflixShowsToSend.filter(
			(item) => item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1
		);
	}

	if (country) {
		netflixShowsToSend = netflixShowsToSend.filter(
			(item) => item.country.toLowerCase().indexOf(country.toLowerCase()) !== -1
		);
	}

	if (release) {
		netflixShowsToSend = netflixShowsToSend.filter(
			(item) => item.release_year === +release
		);
	}

	if (cast) {
		netflixShowsToSend = netflixShowsToSend.filter(
			(item) => item.cast.toLowerCase().indexOf(cast.toLowerCase()) !== -1
		);
	}

	if (genre) {
		netflixShowsToSend = netflixShowsToSend.filter(
			(item) => item.listed_in.toLowerCase().indexOf(genre.toLowerCase()) !== -1
		);
	}

	if (director) {
		netflixShowsToSend = netflixShowsToSend.filter(
			(item) =>
				item.director.toLowerCase().indexOf(director.toLowerCase()) !== -1
		);
	}

	//pagination
	if (page + limit) {
		netflixShowsToSend = netflixShowsToSend.slice(startIndex, endIndex);
	}

	res.json({
		response: netflixShowsToSend,
		success: true,
	});
});

//----SINGLE RESULT------
// endpoint to return a single ID
app.get('/id/:id', (req, res) => {
	const { id } = req.params;
	const uniqueShowID = netflixData.find((item) => item.show_id === +id);

	if (!uniqueShowID) {
		res.status(404).json({
			response: `No shows/movies with ID ${id} found`,
			success: false,
		});
	} else {
		res.status(200).json({
			response: uniqueShowID,
			success: true,
		});
	}
});

//endpoint to find a specific title
app.get('/title/:title', (req, res) => {
	const { title } = req.params; //get data from the variable
	const titleName = netflixData.find(
		(item) => item.title.toLowerCase() === title.toLowerCase()
	);

	if (!titleName) {
		res.status(404).json({
			response: `The title ${title} can not be found :/`,
			success: false,
		});
	} else {
		res.status(200).json({
			response: titleName,
			success: true,
		});
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
