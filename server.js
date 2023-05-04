import express, { response } from "express";
import cors from "cors";
// import listEndpoints from "express-list-endpoints";
import netflixData from "./data/netflix-titles.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";

// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  // res.send("Hello and welcome to Ninas first express API");
  res.json(listEndpoints(app));
});

// Route to see all available endpoints
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});
// get all netflix data
app.get("/movies", (request, response) => {
  response.status(200).json({
    data: netflixData,
    success: true,
  });
})


app.get("/movies", (request, response) => {
  const { title, release_year } = request.query;
  let movies = netflixData;
  if (title) {
    movies = netflixData.filter((singleMovie) => {
      return singleMovie.title.toLowerCase() === title.toLowerCase();
    });
  }
  if (release_year) {
    movies = netflixData.filter((singleMovie) => {
      return singleMovie.release_year.toLowerCase() === release_year.toLowerCase()
    });
  }
  if (movies) {
    response.status(200).json({
      success:true,
      message: "OK",
      body: {
        netflixData: movies
      }
    });
  } else {
    response.status(500).json({
      success:false,
      message: "something went wrong",
      body: {}
    });
  }
  // res.json(netflixData);
});

// DRY dont repeat yourself

// get titles from netflixdata
app.get("/movies/:title", (request, response) => {
  const { title } = request.params;
  const singleTitle = netflixData.find((movies) => {
    return movies.title == title;
  });
  if (singleTitle) {
    response.status(200).json({
      success:true,
      message:"OK",
      body: {
        movie: singleTitle
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
