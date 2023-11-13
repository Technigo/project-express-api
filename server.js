import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const listEndPoints = require("express-list-endpoints");
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
    res.send(listEndPoints(app));
});

console.log(booksData);

app.get("/books", (req, res) => {
    res.json(booksData);
});

app.get("/books/:bookID", (req, res) => {
    const bookID = req.params.bookID;
    const book = booksData.find((book) => book.bookID === parseInt(bookID));
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
