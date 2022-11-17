import express from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';
import { transformIncludesAndExcludes } from '@babel/preset-env';
//console.log(netflixData.length);

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//import avocadoSalesData from './data/avocado-sales.json';
// import booksData from "./data/books.json";
//import goldenGlobesData from './data/golden-globes.json';

// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); //where the requests can come from
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
	const Landing = {
		Hello:
			'Follow below Routes to find the filter 1375 contents documented in the Netflix API',
		Routes: [
			{
				'/content':
					'shows all details of the documented tv shows and movies in json file',
				'/id/id-number': 'returns details of the show with this id-number',
				'/content/title/title-name': 'details for this searched title',
				'/content/director/director-name':
					'shows and details under this director',
				'/type/show': 'all TV Show',
				'/type/movie': 'all movies',
			},
		],
	};
	res.send(Landing);
});

//with '/content' to show all content in the netflixData json file
app.get('/content', (req, res) => {
	res.status(200).json({ netflixData });
});

//read details of the show requested with the correct ID, otherwise return 404 msg
app.get('/content/:id', (req, res) => {
	const showId = netflixData.find((item) => {
		return item.show_id === +req.params.id; //+ turn it into number
	});
	if (showId) {
		res.status(200).json({ body: showId, success: true, message: 'OK' });
	} else
		res.status(404).json({
			message:
				"The ID you're trying to look for doesn't exist, please try again",
			success: false,
			body: {},
		});
});

//get the title by using params
app.get('/content/title/:title', (req, res) => {
	const { title } = req.params;
	const searchedTitle = netflixData.find((item) => {
		return item.title.toLowerCase() === title.toLowerCase();
	});
	if (searchedTitle) {
		res.status(200).json({
			response: { title: searchedTitle },
			success: true,
			message: 'OK',
		});
	} else
		res.status(404).json({
			message: "show doesn't exist, please try another",
			success: false,
		});
});

//get director by using params
app.get('/content/director/:director', (req, res) => {
	const { director } = req.params;
	const searchedDirector = netflixData.filter((item) =>
		item.director.toLowerCase().includes(director.toLowerCase())
	);
	if (searchedDirector) {
		res.status(200).json({
			body: { director: searchedDirector },
			success: true,
			message: 'OK',
		});
	} else
		res.status(404).json({ message: 'Not Found', success: false, body: {} });
});

/* //get the title, director, country using param query
app.get('/content', (req, res) => {
	const { title, director, country } = req.query;
	let filteredContent = netflixData;
	if (title) {
		filteredContent = filteredContent.filter((item) =>
			item.title.toLowerCase().includes(title.toLowerCase())
		);
	}
	if (director) {
		filteredContent = filteredContent.filter((item) =>
			item.director.toLowerCase().includes(director.toLowerCase())
		);
	}
	if (country) {
		filteredContent = filteredContent.filter((item) =>
			item.country.toLowerCase().includes(country.toLowerCase())
		);
	}
	res
		.status(200)
		.json({ body: {filteredContent:filteredContent}, success: true, message: 'OK' });
}); */

app.get('/content/type/:type', (req, res) => {
	const { type } = req.params;
	const showType = netflixData.filter((item) =>
		item.type.toLowerCase().includes(type.toLowerCase())
	);
	if (showType) {
		res.status(200).json({ response: showType, success: true, message: 'OK' });
	} else {
		res.status(404).json({ message: '404, try again', success: false });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
