import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
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

// Start defining your routes here
app.get("/", (request, response) => {
	response.send("Hello from us");
});

app.get("/users", (request, response) => {
	const users = [
		{ id: 1, name: "Alice", age: 33 },
		{ id: 2, name: "Bob", age: 23 },
		{ id: 3, name: "Chris", age: 3 },
		{ id: 4, name: "Daniela", age: 67 },
	];

	response.json(users);
});

app.get("/shows", (request, response) => {
	response.json(netflixData);
});

app.get("/shows/:id", (request, response) => {
	const { id } = request.params;

	const showId = netflixData.find((show) => show.show_id === +id); // By adding a + we are converting the string to a number.

	console.log(showId);

	if (!showId) {
		response.status(404).send("No show found with that id");
	} else {
		response.json(showId);
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port} YAY YAY`);
});
