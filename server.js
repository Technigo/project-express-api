import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// listEndpoint will analyse what possible endpoints we have in our app.
app.get("/", (req, res) => {
	res.send(listEndpoints(app));
});

// Endpoints by using one or more queries
app.get("/shows", (req, res) => {
	const { title, country, year, type, cast } = req.query;

	let netflixDataToSend = netflixData;

	if (title) {
		netflixDataToSend = netflixDataToSend.filter((show) =>
			show.title.toString().toLowerCase().includes(title.toLowerCase())
		);
	}

	if (country) {
		netflixDataToSend = netflixDataToSend.filter((show) =>
			show.country.toString().toLowerCase().includes(country.toLowerCase())
		);
	}

	if (year) {
		netflixDataToSend = netflixDataToSend.filter(
			(show) => show.release_year === +year
		);
	}

	if (type) {
		netflixDataToSend = netflixDataToSend.filter((show) =>
			show.type.toString().toLowerCase().includes(type.toLowerCase())
		);
	}

	if (cast) {
		netflixDataToSend = netflixDataToSend.filter((show) =>
			show.cast.toString().toLowerCase().includes(cast.toLowerCase())
		);
	}

	res.json({
		response: netflixDataToSend,
		success: true,
	});
});

// Endpoint to get a specific show by id, using param
app.get("/shows/id/:id", (req, res) => {
	const { id } = req.params;

	const showById = netflixData.find(
		(show) => show.show_id.toLowerCase() === +id.toLowerCase()
	);

	if (!showById) {
		res.status(404).json({
			response: `No show found with id number ${id}`,
			success: false,
		});
	} else {
		res.json({
			response: showById,
			success: true,
		});
	}
});

// Endpoint to get a specific show by category, using param
app.get("/shows/category/:category", (req, res) => {
	const { category } = req.params;

	const showByCategory = netflixData.filter((show) =>
		show.listed_in.toLowerCase().includes(category.toLowerCase())
	);

	if (!showByCategory) {
		res.status(404).json({
			response: `No show found with the category ${category}`,
			success: false,
		});
	} else {
		res.json({
			response: showByCategory,
			success: true,
		});
	}
});

// Starts the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
