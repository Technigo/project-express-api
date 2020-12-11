import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json';
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

import eruptions from './data/volcanic-eruptions.json';
// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//

const books = booksData;
const ERROR_ERUPTIONS_NOT_FOUND = {
  error: 'No volcanic eruptions were found.',
};

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const endpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
// app.get('/', (request, response) => {
//   response.send('Hello world');
// });

// /endpoints endpoints
// RETURNS: all endpoints
app.get('/endpoints', (request, response) => {
  response.send(endpoints(app));
});

// /eruptions endpoint
// RETURNS: all eruptions from volcanic-eruptions.json
app.get('/eruptions', (request, response) => {
  //let eruptions = eruptions;
  const { name, country, region, type } = request.query;
  console.log(typeof name);
  // if (name) {
  //   eruptions = eruptions.filter(item =>
  //     item.name.toLowerCase().includes(name.toLowerCase())
  //   );
  // }

  // if (country) {
  //   eruptions = eruptions.filter(item =>
  //     item.country.toLowerCase().includes(country.toLowerCase())
  //   );
  // }

  // if (region) {
  //   eruptions = eruptions.filter(item =>
  //     item.region.toLowerCase().includes(region.toLowerCase())
  //   );
  // }

  // if (type) {
  //   eruptions = eruptions.filter(item =>
  //     item.type.toLowerCase().includes(type.toLowerCase())
  //   );
  // }
  response.send({ numOfEruptions: eruptions.length, eruptions });
});

// /eruptions/id endpoint
app.get('/eruptions/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);
  const eruptionById = eruptions.find(eruption => eruption.id === +id);

  if (!eruptionById) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(eruptionById);
  }
});

app.get('/eruptions/name/:name', (request, response) => {
  const { name } = request.params;
  console.log(name);
  const eruptionByName = eruptions.find(
    eruption => eruption.name.toLowerCase() === name.toLowerCase()
  );

  if (eruptionByName.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(eruptionByName);
  }
});

app.get('/eruptions/year/:year', (request, response) => {
  const { year } = request.params;
  const eruptionsByYear = eruptions.filter(
    eruption => eruption.lastKnownEruption === year
  );

  if (eruptionsByYear.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(eruptionsByYear);
  }
});

app.get('/eruptions/region/:region/country/:country', (request, response) => {
  const { region, country } = request.params;
  // const { country } = request.query;
  // const filteredByRegionCountry = eruptions;
  const filteredByRegionCountry = eruptions.filter(
    eruption => eruption.region === region && eruption.country === country
  );

  if (filteredByRegionCountry.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(filteredByRegionCountry);
  }
});

app.get('/eruptions/type/:type', (request, response) => {
  const { type } = request.params;
  const { rockType, tectonicSetting } = request.query;
  let eruptionsByType = eruptions;
  eruptionsByType = eruptionsByType.filter(eruption => eruption.type === type);

  if (rockType) {
    eruptionsByType = eruptionsByType.filter(
      eruption => eruption.dominantRockType === rockType
    );
  }

  if (tectonicSetting) {
    eruptionsByType = eruptionsByType.filter(
      eruption => eruption.tectonicSetting === tectonicSetting
    );
  }

  if (eruptionsByType.length === 0) {
    response.status(404).json(ERROR_ERUPTIONS_NOT_FOUND);
  } else {
    response.json(eruptionsByType);
  }
});

// app.get('/books', (request, response) => {
//   const { title, author } = request.query;
//   //const { author } = request.query;
//   console.log(title);
//   if (author) {
//     const filteredBooksList = books.filter(item =>
//       item.authors.toString().toLowerCase().includes(author.toLocaleLowerCase())
//     );
//     response.json(filteredBooksList);
//   } else {
//     response.json(books);
//   }

//   if (title) {
//     const filteredBooks = books.filter(book => book.title === title);
//     console.log(typeof filteredBooks);
//     response.json(filteredBooks);
//   } else {
//     response.json(books);
//   }
// });

// app.get('/books/:id', (request, response) => {
//   console.log(request.params);
//   const id = request.params.id;
//   console.log(id);
//   const book = books.find(book => book.bookID === +id);
//   console.log(book);
//   response.json(book);
//   // if (book) {
//   //   response.json(book);
//   // }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
