import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data/netflix-titles.json";

//I've left all coments so that I can go back to this project and read them if necessary in the future.

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

// Displays object(s) with specific title
app.get("/titles/:title", (req, res) => {
  const title = req.params.title;
  // I dont know why I need to use toString on item.title and not on item.actore further down, would love to know why!
  const contentWithTitle = data.filter(
    (item) => item.title.toString().toLowerCase() === title.toLowerCase()
  );

  res.json(contentWithTitle);
});

app.get("/IDs/:id", (req, res) => {
  // Displays object with specific ID
  const id = req.params.id;
  const contentWithId = data.filter((item) => item.show_id === +id);

  res.json(contentWithId);
});

app.get("/actors/:actor", (req, res) => {
  // Shows everything the specific actor has been casted in
  const actor = req.params.actor;
  const moviesWithActor = data.filter((item) =>
    item.cast.toLowerCase().includes(actor.toLowerCase())
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

app.get("/countries/:country", (req, res) => {
  // Shows everything from a specific year with the possibilty to filter on type of content.
  const country = req.params.country;
  const type = req.query.type;

  let contentFromCountry = data.filter((item) => item.country === country);

  if (type) {
    contentFromCountry = contentFromCountry.filter(
      (item) => item.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.json(contentFromCountry);
});

app.get("/duration/:minutes", (req, res) => {
  //Shows content that has the exact length searched for
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
