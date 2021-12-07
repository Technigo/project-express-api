import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, name: "Alice", age: 33 },
  { id: 2, name: "Bob", age: 18 },
  { id: 3, name: "Chris", age: 45 },
  { id: 4, name: "Eddie", age: 29 },
];

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/netflix", (req, res) => {
  res.json(netflixData);
});

app.get("/netflix/:title", (req, res) => {
  const { title } = req.params;

  const movieTitle = netflixData.find(movie => movie.title === +title);

  if (!movieTitle) {
    res.status(404).send("No movie found with that name");
  } else {
    res.json(movieTitle);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
