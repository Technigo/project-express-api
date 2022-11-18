import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json"; //import the json file with data

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (request, respons) => {
  respons.status(200).json({
    Hello: "Here you can see all my routes!",
    Routes: [
      { "/movies": "all movie data" },
      { "/titles": "a list of all titles" },
      { "/movies/:show_id": "E.g. if you add 81193313 as the id, it will show information about a specific movie, for instance id 81193313 will give us info about the movie Chocolate" },
      { "/movies/:year": "a list of movie data from a specific release year" },
    ],
  });
});
//get all data
app.get("/movies", (request, respons) => {
  const { rating, type } = request.query;
  let filteredMovies = netflixData;
  if (rating) {
    // members = technigoMembers.filter(singleTechnigoMember => { return singleTechnigoMember.role === role});
    filteredMovies = filteredMovies.filter(singleMovie => singleMovie.rating.toLowerCase() === rating.toLowerCase());
  }
  if (type) {
    filteredMovies = filteredMovies.filter(singleMovie => { return singleMovie.type.toLowerCase() === type.toLowerCase()});
  }
  respons.status(200).json({
    success: true,
    message: "OK",
    body: {
      netflixData: filteredMovies
    }
  });
console.log('filteredMovies',filteredMovies)
});
//get all titles

app.get("/titles", (request, respons) => {
  const titleList = netflixData.map((movie) => movie.title);

  if (titleList) {
    respons.status(200).json({ data: titleList, success: true });
  } else {
    respons.status(200).json({ data: [], success: false });
  }
});
//get all movie data from a specific year
app.get("/movies/:year", (request, respons) => {
  let year = request.params.year;
  let releaseYearMovieData = netflixData.filter(
    (movie) => +movie.release_year() === +movie.year()
  );

  if (releaseYearMovieData) {
    respons.status(200).json({ data: releaseYearMovieData, success: true });
  } else {
    respons.status(200).json({ data: [], success: false });
  }
});
//get singel specific movie
app.get("/movies/:show_id", (request, response) => {
  const singleMovie = netflixData.find((movie) => {
    return movie.show_id === Number(request.params.show_id);
    // return member.id === +request.params.id;
    // return member.id.toString() === request.params.id;
    // return member.id == request.params.id;
  });
  if(singleMovie) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        movie: singleMovie
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log('singleMovie', singleMovie);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
