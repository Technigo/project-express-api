import express from "express";

import data from "../data/netflix-titles.json";

// ----------------- GLOBAL VARIABLES ---------------- //
const router = express.Router();

// --------------------- FUNCTIONS ------------------- //

// slice depending on page query (10 results per page)
const sliceData = (array, num, res) => {
  array = array.slice(num * 10, (num + 1) * 10);
  return array.length < 1
    ? res.status(404).send({ error: "Sorry, no more pages" })
    : array;
};

// for adding queries
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
      i < 3 ? (i += 1) : (i = 1); // used to loop through array with queries
      if (queryArr[i].value) {
        return item[queryArr[i].name].toString().toLowerCase().replace(" ", "")
          .includes(queryArr[i].value);
      }
    });
  } else {
    filteredArr = arr;
  }

  if (page) {
    // user can see more results with query page
    filteredArr = sliceData(filteredArr, Number(page), res);
  }

  // if no data is returned from filtering (no match with params/query) a message says so
  if (filteredArr.length === 0) {
    res.status(404).send({ error: "Sorry, no titles found for this search" });
  } else {
    res.json(filteredArr.slice(0, 10)); // slice so result always is max 10 objects
  }
};

// ---------------------- ROUTES FUNCTIONS -------------------- //
const listEndpointRecent = (para, name) => {
  router.get(`${para}/:recent`, (req, res) => {
    let array;

    // filters on params ( -> on empty no filter as that is the index route and shows all data)
    if (para !== "") {
      array = data.filter((item) => item.type === name);
    } else {
      array = data;
    }
    
    // sorts array on latest added
    const sortArray = array.sort((a, b) => (a.date_added > b.date_added ? -1 : 1));
    // sets array to the 50 latest added items (shows 10/ page, page 0-4 can be fetched)
    array = sortArray.filter((item, i) => i < 50);

    handleQueries(req, res, array); // adds and checks queries by a function
  });
};

const listEndpoint = (para, name) => {
  router.get(`/${para}`, (req, res) => {
    let array;

    // filters on params ( -> on empty no filter as that is the index route and shows all data)
    if (para !== "") {
      array = data.filter((item) => item.type === name);
    } else {
      array = data;
    }
    handleQueries(req, res, array); // adds and checks queries by a function
  });
};

// function for routing
const singleEndpoint = (para) => {
  router.get(`/${para}/:${para}`, (req, res) => {
    const { id, title } = req.params;

    /* finds data according to id/title by comparing to the specific parameter in the
      json. From the json data spaces and uppercases are removed to be able to match with params */
    const array = data.find(
      (item) => item.show_id === +id
        || item.title.toString().toLowerCase().replace(" ", "") === title.toString().toLowerCase().replace(" ", "")
    );

    res.json(array);
  });
};

// -------------------- EXECUTING FUNCTIONS ------------------- //

// execute routing function with specific arguments
singleEndpoint("id"); // specific id
singleEndpoint("title"); // specific title
listEndpoint("", ""); // home/index (all data)
listEndpoint("movies", "Movie"); // movies
listEndpoint("tvshows", "TV Show"); // tv-shows
listEndpointRecent("/movies", "Movie"); // recent movies 
listEndpointRecent("/tvshows", "TV Show"); // recent tv-shows
listEndpointRecent("", ""); // home/index (recent both tv-shows and movies)

module.exports = router;
