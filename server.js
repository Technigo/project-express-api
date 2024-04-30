import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(endpoints);
  console.log(endpoints);
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

// Getting all endpoint with express List Endpoints
const endpoints = expressListEndpoints(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
