import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({responsmessage: "Movie time"});
});
app.get("/type", (req, res) => {
  // return the category title in netflixData array try: 
  res.json(netflixData);
})
app.get("/movies/:year", (req, res) => {
  const year = req.params.year;
  const filteredMovies = netflixData.filter((movie) => movie.release_year === +year);
  res.json(filteredMovies);
});
app.get("/country/:country", (req, res) => {
  const country = req.params.country;
  const filteredCountry = netflixData.filter((movie) => movie.country === country);
  res.json(filteredCountry);
});

// create an endport that returns all movies in alphabetical order based on title "http://localhost:9090/sort/title/asc"
app.get("/sort/title/:sort", (req, res) => {
  const sort = req.params.sort;
  let sortedMovies = netflixData;
  if (sort === "asc") {
    sortedMovies = netflixData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "desc") {
    sortedMovies = netflixData.sort((a, b) => b.title.localeCompare(a.title));
  }
  res.json(sortedMovies);
});
// create an endpoint to return a collection of results (array of elements) based on a search term in the title "http://localhost:9090/search/title?title=The"
app.get("/search/title", (req, res) => {
  const title = req.query.title;
  let filteredTitle = netflixData;
  if (title) {
    filteredTitle = netflixData.filter((movie) => {
      const movieTitle = movie.title.toString();
      return movieTitle.includes(title);
    });
  }
  res.json(filteredTitle);
});
// create an endpoint to return a collection of results (array of elements) based on a search term in the description "http://localhost:9090/search/description?description=The"
app.get("/search/description", (req, res) => {
  const description = req.query.description;
  let filteredDescription = netflixData;
  if (description) {
    filteredDescription = netflixData.filter((movie) => {
      const movieDescription = movie.description.toString();
      return movieDescription.includes(description);
    });
  }
  res.json(filteredDescription);
});

// create a endpoint to return a single result (single element)  based on id "http://localhost:9090/id/81193313"
app.get("/id/:id", (req, res) => {
  const id = req.params.id;
  const filteredId = netflixData.find((movie) => movie.show_id === +id);
  res.json(filteredId);
});



// create an endpoint to return a collection of results (array of elements) based on filter actors "http://localhost:9090/actors?actors=Tom"
app.get("/actors", (req, res) => {
  const actors = req.query.actors;
  let filteredActors = netflixData;
  if (actors) {
    filteredActors = netflixData.filter((movie) => {
      const movieActors = movie.cast.toString();
      return movieActors.includes(actors);
    });
  }
  res.json(filteredActors);
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

