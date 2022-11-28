import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json"; //import the json file with data
console.log('netflixData', netflixData)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
response.status(200).json({
    Hello: "Here you can see all my routes!",
    Routes: [
      { "/movies": "all movie data" },
      { "/titles": "a list of all titles" },
      { "/movies/:id": "E.g. if you add 81193313 as the id, it will show information about a specific movie, for instance id 81193313 will give us info about the movie Chocolate" },
      { "/movies/year/:year": "a list of movie data from a specific release year" },
      { "/movies?director=": "show movies based on director's name, for instance Mati Diop"},
      { "/movies?type=": "show movies based on a type, for instance TV show"}
    ],
  });
});
//get all data
app.get("/movies", (request, response) => {
  let movieData = netflixData;
  
  const {
    director,
    type
  } = request.query;

    //get movies created by a specific director

  if (director) {
    movieData = movieData.filter(singleMovieData => singleMovieData.director.toLowerCase() === director.toLowerCase());
  }
    //get movies with a specific type

  if (type) {
    movieData = movieData.filter(singleMovieData => singleMovieData.type.toLowerCase() === type.toLowerCase());
  }

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
    netflixData: movieData
    }
  });
});

//   if (movieData) {
//     response.status(200).json({ 
//       data: netflixData, 
//       success: true,
//       message: "OK",
//       debug: 'Movies' });
//   } else {
//     response.status(200).json({ 
//       data: [], 
//       success: false,
//       message: "Not Found"});
//   }
// });

//get all titles

app.get("/titles", (request, respons) => {
  const titleList = netflixData.map((movie) => movie.title);

  if (titleList) {
    respons.status(200).json({ 
      data: titleList, 
      success: true,
      message: "Ok"});
  } else {
    respons.status(200).json({ 
      data: [], 
      success: false,
      message: "Not Found"});
  }
});

//get singel specific movie
app.get("/movies/:id", (request, response) => {
  console.log('Looking up id')
  const singleMovie = netflixData.find((movie) => {
  return movie.show_id === +request.params.id;

  });
  console.log('singleMovie', singleMovie)
  if(singleMovie) {
    response.status(200).json({
      success: true,
      message: "OK",
      data: {
      netflixData: singleMovie,
      debug: 'Movies ID'
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      data: {},
      debug: 'Movies ID false' 
    });
  }
});


//get all movie data from a specific year
app.get("/movies/year/:year", (request, response) => {
  console.log('Looking up year')
  let year = request.params.year;
  let releaseYearMovieData = netflixData.filter((movie) => movie.release_year === +year
  );

  if (releaseYearMovieData) {
    response.status(200).json({ 
      data: releaseYearMovieData, 
      success: true,
      debug: 'Movies year' });
  } else {
    response.status(200).json({ 
      data: [], 
      success: false,
      debug: 'Movies year false'  });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
