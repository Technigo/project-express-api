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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(`Welcome to the Netflix API with ${data.length} listed movies and TV shows.`);
});

// List both movies and TV shows.
app.get("/all", (req, res) => {
  res.json(data);
});

// List movies
app.get("/movies", (req, res) => {
  const movies = data.filter((item) => item.type === "Movie");
  res.json(movies);
});

// List TV shows
app.get("/tv-shows", (req, res) => {
  const tvShows = data.filter((item) => item.type === "TV Show");
  res.json(tvShows);
});

// Return a movie or tv show that matches an id
app.get("/id/:id", (req, res) => {
  const { id } = req.params;
  const itemFound = data.find((item) => item.show_id === +id);

  itemFound
    ? res.json(itemFound)
    : res.send(`Sorry, couldn't find a movie or TV show with ID ${id}`);
});

// List all titles or only the once matching the title keyword
// /titles
// /titles?title=Love
app.get("/titles", (req, res) => {
  const { title } = req.query;
  if (!title) {
    res.json(data.map((item) => item.title));
  } else {
    const titleToLowerCase = title.toLowerCase();
    const filteredByTitle = data.filter((item) =>
      item.title.toString().toLowerCase().includes(titleToLowerCase)
    );
    res.json(filteredByTitle);
  }
});

// Return a list of directors
// /directors
app.get("/directors", (req, res) => {
  const { director } = req.query;
  const directorsArray = data.map((item) => item.director);
  const uniqueDirectorsArray = [...new Set(directorsArray)];
  res.json(uniqueDirectorsArray);
});

// Return movies and TV shows from a specific director
// /directors/Scorsese/all
app.get("/directors/:director/all", (req, res) => {
  const { director } = req.params;
  const directorCapitalized =
    director.charAt(0).toUpperCase() + director.slice(1);
  const filteredByDirector = data.filter((item) =>
    item.director.includes(directorCapitalized)
  );
  {
    filteredByDirector.length === 0
      ? res.send(
          `Sorry, couldn't find any movies or TV shows directed by ${director}.`
        )
      : res.json(filteredByDirector);
  }
});

// Return movies and TV shows from a specific country
// /countries?country=France
app.get("/countries", (req, res) => {
  const { country } = req.query;
  if (!country) {
    const countriesArray = data.map((item) => item.country);
    const uniqueCountriesArray = [...new Set(countriesArray)];
    res.json(uniqueCountriesArray);
  }
  const countryCapitalized = country.charAt(0).toUpperCase() + country.slice(1);
  const filteredByCountry = data.filter((item) =>
    item.country.includes(countryCapitalized)
  );
  {
    filteredByCountry.length === 0
      ? res.send(`Sorry, couldn't find anything from ${country} `)
      : res.json(filteredByCountry);
  }
});

// Return movies and TV shows released in a specific year
// /release?year=2018
app.get("/releases", (req, res) => {
  const { year } = req.query;

  if (!year) {
    res.send(
      "To get a list of movies and TV shows released from a specific year, for example 2018, use query string '/releases?year=2018'."
    );
  }
  const filteredByReleaseYear = data.filter(
    (item) => item.release_year === +year
  );
  {
    filteredByReleaseYear.length === 0
      ? res.send(`Sorry, couldn't find anything from the year ${year} `)
      : res.json(filteredByReleaseYear);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
