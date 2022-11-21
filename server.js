import express from "express";
import cors from "cors";
import netflixTitles from './data/netflix-titles.json'
import listEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here

/* app.get("/", (req, res) => {
  res.send(netflixTitles);
}); */
app.get("/", (req, res) => {
	res.json({
    NetflixTitles: "Information about movies and tv-shows, from Netflix", 
    randomEndpoint: "/random generates a random movie or tv-show",
    moviesEndpoint: "/movies will return all movies",
    tvShowsEndpoint: "/tvShows will return all TV shows",
    queries: "at movies and tvShows endpoints you can make a query using key and value, e.g. /movies?key=title&value=The Accidental Spy"
  
    });

});

// at /movies filtering matches the query with the corresponding key of the data 
app.get("/movies", (req, res) => {
  let { key, value } = req.query;
    key = key?.toLowerCase();
    value = value?.toLowerCase()

// if query contain a key but no value or vice versa the api sends bad request.
  if((!key && value) || (key && !value)) {
    res.status(400).json({
      success: true,
      message: "OK",
      body: "Bad request"
    });
  }

  let allMovies = netflixTitles.filter((movie) => movie.type === "Movie");

  if(key && value) {
    // if query key is show_id or release_year, the value of the query compared
    // to the value of the corresponding key in the data.
    if(key === 'show_id' || key === 'release_year') {
      allMovies = allMovies.filter((movie) => {
        if(movie[key].toString() === value) return true;
        else return false;
      })
      // If query key is any other than show_id or release_year, the api will return 
      // all items including the query value.
    } else {
      allMovies = allMovies.filter((movie) => {
        if(movie[key].toString().toLowerCase().includes(value)) return true;
        else return false;
      })
    }
  }

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      result: allMovies
    }
  });
})

app.get("/tvShows", (req, res) => {
  let { key, value } = req.query;
  // question mark here to account for that key and value might be undefined
    key = key?.toLowerCase();
    value = value?.toLowerCase()

  if((!key && value) || (key && !value)) {
    res.status(400).json({
      success: true,
      message: "OK",
      body: "Bad request"
    });
  }
  let allShows = (netflixTitles.filter((show) => show.type === "TV Show"))

  if(key && value) {
    if(key === 'show_id' || key === 'release_year') {
      allShows = allShows.filter((show) => {
        if(show[key].toString() === value) return true;
        else return false;
      })
    } else {
      allShows = allShows.filter((show) => {
        if(show[key].toString().toLowerCase().includes(value)) return true;
        else return false;
      })
    }
  }

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      result: allShows
    }
  });

})

//generate random title
app.get('/random', (req, res) => {
  let selectedTitle = netflixTitles[Math.floor(Math.random()*(netflixTitles.length))]  

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      result: selectedTitle
    }
  });
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
