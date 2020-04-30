import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // Displays all movies and shows
  res.json(data);
});

app.get("/IDs/:id", (req, res) => {
  // Displays object with specific ID
  const id = req.params.id;
  const movieWithId = data.filter((item) => item.show_id === +id);

  res.json(movieWithId);
});

app.get("/actors/:actor", (req, res) => {
  // Shows everything the specific actor has been casted in
  const actor = req.params.actor;
  const moviesWithActor = data.filter((item) =>
    item.cast.toLowerCase().includes(actor)
  );

  res.json(moviesWithActor);
});

app.get("/years/:year", (req, res) => {
  // Shows everything from a specific year with the possibilty to filter on type of content.
  const year = req.params.year;
  const type = req.query.type;

  let contentFromYear = data.filter((item) => item.release_year === +year);

  if (type) {
    contentFromYear = contentFromYear.filter(
      (item) => item.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.json(contentFromYear);
});

app.get("/duration/:minutes", (req, res) => {
  const length = req.params.minutes;
  const exactlyThatLong = data.filter(
    (item) => item.duration === `${length} min`
  );

  res.json(exactlyThatLong);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
