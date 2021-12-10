import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./data/books.json";
import listEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here

app.get("/", (req, res) => {
	res.send("Welcome to this API ");
});

app.get("/endpoints", (req, res) => {
	res.send(listEndpoints(app));
});

app.get("/books", (req, res) => {
	const { author, title, language } = req.query;
	let filteredBooks = data;

	if (author) {
		filteredBooks = filteredBooks.filter(
			(item) => item.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1
		);
	}

	if (title) {
		filteredBooks = filteredBooks.filter(
			(item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
		);
	}

	if (language) {
		filteredBooks = filteredBooks.filter(
			(item) =>
				item.language_code.toLowerCase().indexOf(language.toLowerCase()) !== -1
		);
	}

	res.json({
		response: filteredBooks,
		success: true,
	});
});

// search by isbn or isbn13 number
app.get("/books/isbn/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const book = data.find(
		(item) => item.isbn === +isbn || item.isbn13 === +isbn
	);
	if (!book) {
		res.status(404).json({
			response: "No book with that ISBN or ISBN13 number",
			success: false,
		});
	} else {
		res.status(200).json({
			response: book,
			success: true,
		});
	}
});

//takes the id as params
app.get("/books/:id", (req, res) => {
	const id = req.params.id;
	const filteredID = data.filter((item) => item.bookID === +id);
	res.json(filteredID);
});

//endpoint with random book
app.get("/randomBook", (req, res) => {
	let randomBook = data[Math.floor(Math.random() * data.length)];

	if (!randomBook) {
		res.status(404).json({
			response: "Something went wrong, try again!",
			success: false,
		});
	} else {
		res.status(200).json({
			response: randomBook,
			success: true,
		});
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
