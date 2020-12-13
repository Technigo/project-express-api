import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import eruptions from './data/volcanic-eruptions.json';
const ERROR_ERUPTIONS_NOT_FOUND = {
  error: 'No volcanic eruptions were found.',
};
// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// To list all endpoints
const endpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// / endpoint
// RETURNS: A list of all endpoints as an array
//
app.get('/', (request, response) => {
  response.send(endpoints(app));
});

// /eruptions endpoint
// RETURNS: A list of all eruptions from volcanic-eruptions.json as an array
//
// PARAMETERS:
// - page (default: 0): a number indicating what page number to show
//    usage: /eruptions/?page=1
// - pageSize (default: 20): a number indicating how many results to show per page
//    usage: /eruptions/?pageSize=40
//
app.get('/eruptions', (request, response) => {
  // Pagination, default set to 20 results per page
  // Page is set to 0 as default, to start on page 0
  const page = request.query.page ? request.query.page - 1 : 0;
  // Page size is set to 20 as default
  const pageSize = request.query.pageSize ?? 20;
  // Calculate start index
  const startIndex = page * pageSize;
  // Calculate end index
  const endIndex = startIndex + +pageSize;
  // Slice list of eruptions to show chosen page
  const eruptionsPerPage = eruptions.slice(startIndex, endIndex);
  const returnObject = {
    TotalEruptions: eruptions.length,
    eruptions:
      'Returns all eruptions as an array, with query parameters to change pageSize and paige, from volcanic-eruptions.json',
    TotalPages: Math.ceil(eruptions.length / pageSize),
    EruptionsPerPage: pageSize,
    currentPage: page + 1,
    results: eruptionsPerPage,
  };
  response.json(returnObject);
});

// /eruptions/:id endpoint
// RETURNS: One unique item
//
// PARAMETERS:
// - id: a unique number
//    usage: /eruptions/390847
//
app.get('/eruptions/:id', (request, response) => {
  const { id } = request.params;
  const eruptionById = eruptions.find(eruption => eruption.id === +id);

  const returnObject = {
    TotalEruptions: eruptions.length,
    eruptionsFilteredById:
      'Returns eruption filtered by id as an object, from volcanic-eruptions.json',
    results: eruptionById,
  };

  if (!eruptionById) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/name/:name endpoint
// RETURNS: One unique item
//
// PARAMETERS:
// - name: a unique name of one item
//    usage: /eruptions/name/Meidob%20Volcanic%20Field
//
app.get('/eruptions/name/:name', (request, response) => {
  const { name } = request.params;
  console.log(name);
  const eruptionByName = eruptions.find(
    eruption => eruption.name.toLowerCase() === name.toLowerCase()
  );

  const returnObject = {
    TotalEruptions: eruptions.length,
    eruptionsFilteredByName:
      'Returns eruption filtered by name as an object, from volcanic-eruptions.json',
    results: eruptionByName,
  };

  if (!eruptionByName) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/year/:year endpoint
// RETURNS: A list of eruptions from one year as an array
//
// PARAMETERS:
// - year: a string containing a year
//    usage: /eruptions/year/2016%20CE
//
app.get('/eruptions/year/:year', (request, response) => {
  const { year } = request.params;
  const eruptionsByYear = eruptions.filter(
    eruption => eruption.last_known_eruption === year
  );

  const returnObject = {
    TotalEruptions: eruptions.length,
    eruptionsFound: eruptionsByYear.length,
    eruptionsFilteredByYear:
      'Returns eruptions filtered by year as an array, from volcanic-eruptions.json',

    results: eruptionsByYear,
  };

  if (eruptionsByYear.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/region/:region endpoint
// RETURNS: A list of eruptions from a specified region as an array
//
// PARAMETERS:
// - region: a string containing the name of a region
//    usage: /eruptions/region/Mediterranean%20and%20Western%20Asia
// - country: a string containing the name of a country
//    usage: /eruptions/region/Mediterranean%20and%20Western%20Asia/?country=Greece
//
app.get('/eruptions/region/:region', (request, response) => {
  const { region } = request.params;
  const { country } = request.query;
  let eruptionsByRegionCountry = eruptions.filter(
    eruption => eruption.region === region
  );

  if (country) {
    eruptionsByRegionCountry = eruptionsByRegionCountry.filter(
      eruption => eruption.country === country
    );
  }

  const returnObject = {
    TotalEruptions: eruptions.length,
    eruptionsFound: eruptionsByRegionCountry.length,
    eruptionsFilteredByRegion:
      'Returns eruptions filtered by region as an array, with query parameters to filter on country, from volcanic-eruptions.json',

    results: eruptionsByRegionCountry,
  };

  if (eruptionsByRegionCountry.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/type/:type endpoint
// RETURNS: A list of eruptions of a specified type as an array
//
// PARAMETERS:
// - type: a string containing the name of a type
//    usage: /eruptions/type/Submarine
// - rockType: a string containing the name of a rock type
//    usage: /eruptions/type/Caldera/?rockType=Foidite
// - tectonicSetting: a string containing the name of a tectonic setting
//    usage: /eruptions/type/Caldera/?tectonicSetting=Subduction%20Zone%20/%20Continental%20Crust%20(>25%20km)
//
app.get('/eruptions/type/:type', (request, response) => {
  const { type } = request.params;
  const { rockType, tectonicSetting } = request.query;
  let eruptionsByType = eruptions;
  eruptionsByType = eruptionsByType.filter(eruption => eruption.type === type);

  if (rockType) {
    eruptionsByType = eruptionsByType.filter(
      eruption => eruption.dominant_rock_type === rockType
    );
  }

  if (tectonicSetting) {
    eruptionsByType = eruptionsByType.filter(
      eruption => eruption.tectonic_setting === tectonicSetting
    );
  }

  const returnObject = {
    totalEruptions: eruptions.length,
    eruptionsFound: eruptionsByType.length,
    eruptionsFilteredByType:
      'Returns eruptions filtered by type as an array, with query parameters to filter on rock type and/or tectonic settings, from volcanic-eruptions.json',
    results: eruptionsByType,
  };

  if (eruptionsByType.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/rock-type/:rock-type endpoint
// RETURNS: A list of eruptions of a specified rock type as an array
//
// PARAMETERS:
// - rockType: a string containing the name of a rock type
//    usage: /eruptions/rock-type/Foidite
app.get('/eruptions/rock-type/:rockType', (request, response) => {
  const { rockType } = request.params;
  const eruptionsByRock = eruptions.filter(
    eruption => eruption.dominant_rock_type === rockType
  );

  const returnObject = {
    totalEruptions: eruptions.length,
    eruptionsFilteredByRockType:
      'Returns eruptions filtered by dominant rock type as an array, from volcanic-eruptions.json',
    eruptionsFound: eruptionsByRock.length,
    results: eruptionsByRock,
  };

  if (eruptionsByRock.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/elevation/highest-20 endpoint
// RETURNS: A list of the 20 highest volcanoes as an array
//
app.get('/eruptions/elevation/highest-20', (request, response) => {
  const sortedOnHighest = eruptions.sort(
    (a, b) => b.elevation_meters - a.elevation_meters
  );
  const highestVolcanoesArray = sortedOnHighest.slice(0, 20);

  const returnObject = {
    TotalEruptions: eruptions.length,
    twentyHighestVolcanoes:
      'Returns the twenty highest volcanoes in meters as an array, from volcanic-eruptions.json',
    results: highestVolcanoesArray,
  };

  if (highestVolcanoesArray.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// /eruptions/elevation/lowest-20 endpoint
// RETURNS: A list of the 20 lowest volcanoes as an array
//
app.get('/eruptions/elevation/lowest-20', (request, response) => {
  const sortedOnLowest = eruptions.sort(
    (a, b) => a.elevation_meters - b.elevation_meters
  );
  const lowestVolcanoesArray = sortedOnLowest.slice(0, 20);
  const returnObject = {
    TotalEruptions: eruptions.length,
    twentyLowestVolcanoes:
      'Returns the twenty lowest volcanoes in meters as an array, from volcanic-eruptions.json',
    results: lowestVolcanoesArray,
  };

  if (lowestVolcanoesArray.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(returnObject);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
