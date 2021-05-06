import express from "express";

import data from "../data/netflix-titles.json";

// ----------------- GLOBAL VARIABLES ---------------- //
const router = express.Router();

let netflixById; 
let netflixByTitle; 
let netflixByMovies; 
let netflixByTvShows; 
let netflixByTvShowsRecent; 
let netflixByMoviesRecent;

// --------------------- FUNCTIONS ------------------- //
// slice depending on page query (10 results per page)
const sliceData = (array, num, res) => {
  array = array.slice(num * 10, (num + 1) * 10);
  return array.length < 1 ? res.send("Sorry, no more pages") : array;
};
  
const handleQueries = (req, res, arr) => {    
  let filteredArr;
  const { year, genre, page, country } = req.query;
  const queryArr = [
    { name: "", value: "" },
    { name: "release_year", value: year },
    { name: "listed_in", value: genre },
    { name: "country", value: country }
  ];
  let i = 0;
  
  // if a query exists the array will be filtered after that query. 
  if (year || genre || country) {
    // eslint-disable-next-line array-callback-return
    filteredArr = arr.filter((item) => {
    // eslint-disable-next-line no-unused-expressions
      i < 3 ? (i += 1) : (i = 1);// used to loop through array with queries
      if (queryArr[i].value) {
        return item[queryArr[i].name].toString().toLowerCase().replace(" ", "").includes(queryArr[i].value);
      } 
    })
  } else {
    filteredArr = arr;
  }
  
  if (page) {
    // user can see more results with query page
    filteredArr = sliceData(filteredArr, Number(page), res); 
  }
  
  // if no data is returned from filtering (no match with params/query) a message says so
  if (filteredArr.length === 0) {
    res.status(404).send(`
              Sorry, no titles found for this search
            `);
  } else {
    res.json(filteredArr.slice(0, 10)); // so result always is max 20 objects
  }
};

// ------------------------- ROUTES ---------------------- //
router.get("/", (req, res) => {
  handleQueries(req, res, data) // homepage with all data, can be used queries on
});
  
const listEndpointRecent = (para, name, array) => {
  router.get(`/${para}/:recent`, (req, res) => {
    const { recent } = req.params;

    array = data.filter((item) => item.type === name)
    // sorts array on latest added
    const sortArray = array.sort((a, b) => (a.date_added > b.date_added ? -1 : 1)); 
    // sets array to the 50 latest added items (shows 10/ page, page 0-4 can be fetched)
    array = sortArray.filter((item, i) => i < 50); 

    handleQueries(req, res, array)// adds and checks queries by a function
  })
}

const listEndpointMedia = (para, name, array) => {
  router.get(`/${para}`, (req, res) => {
    array = data.filter((item) => item.type === name);
    handleQueries(req, res, array)// adds and checks queries by a function
  })
};
  
// function for routing
const singleEndpoint = (para, array) => {
  router.get(`/${para}/:${para}`, (req, res) => {
    const { id, title } = req.params;
  
    /* filters data according to route name and params by comparing to the specific parameter in the
      json. From the json data spaces and uppercases are removed to be able to match with params */
    array = data.find(
      (item) => item.show_id === +id
          || item.title.toString().toLowerCase().replace(" ", "") === title
    );
  
    res.json(array);
  });
};

// -------------------- EXECUTING FUNCTIONS ------------------- //
  
// execute routing function with specific arguments
singleEndpoint("id", netflixById);
singleEndpoint("title", netflixByTitle);
listEndpointMedia("movies", "Movie", netflixByMovies);
listEndpointMedia("tvshows", "TV Show", netflixByTvShows);
listEndpointRecent("movies", "Movie", netflixByMoviesRecent);
listEndpointRecent("tvshows", "TV Show", netflixByTvShowsRecent);

module.exports = router;