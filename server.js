import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
import avocadoSalesData from './data/avocado-sales.json';
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
	res.send('Try an endpoint to fetch something!😀');
});

app.get('/avocado', (req, res) => {
	const { date, region, averagePrice } = req.query;

	let dateToFind = avocadoSalesData;
	let regionToFind = avocadoSalesData;
	let averagePriceToFind = avocadoSalesData;

	if (date) {
		dateToFind = dateToFind.filter(
			(item) => item.date.toLowerCase().indexOf(date.toLowerCase()) !== -1
		);
	}

	// working on this one, cant display it yet.
	if (region) {
		regionToFind = regionToFind.filter(
			(item) => item.region.toLowerCase().indexOf(region.toLowerCase()) !== -1
		);
	}
	// working on this one, cant display it yet.
	if (averagePrice) {
		averagePriceToFind = averagePriceToFind.filter(
			(item) => item.averagePrice === +averagePrice
		);
	}

	res.send({
		response: dateToFind,
		success: true,
	});

	res.send({
		response: regionToFind,
		success: true,
	});

	res.send({
		response: averagePriceToFind,
		success: true,
	});

	res.send({
		response: avocadoSalesData,
		success: true,
	});
});

//get a specific avocado based on id, using param
app.get('/avocados/id/:id', (req, res) => {
	const { id } = req.params;

	const avocadoDetail = avocadoSalesData.find((avocado) => avocado.id === +id);

	if (!avocadoDetail) {
		res.status(404).send('no freesh avacadoos found');
	} else {
		res.json(avocadoDetail);
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
