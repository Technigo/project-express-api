import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import wine from './data/wine.json';
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// http://localhost:8080/
app.get('/', (req, res) => {
  res.json({
    responseMessage:
      'Wine Reviews: over hundred wine reviews with variety, location, winery, price, and description',
    data: listEndpoints(app),
  });
});

// Start defining your routes here ENDPOINT
// app.get('/', (req, res) => {
//   res.send('Hello My Server!');
// });

// Endpoint to get all the data
app.get('/wines', (req, res) => {
  res.json(wine);
});

// Endpoint to get particular wine by id
app.get('/wines/:id', (req, res) => {
  const id = req.params.id;
  const singleWine = wine.find((singleWine) => singleWine.id === +id);
  if (!singleWine) {
    res.status(404).send(' 🍷🍷🍷 Wine not found 🍷🍷🍷 ');
  }
  res.json(singleWine);
});

// Endpoint to get wine by country
// http://localhost:8080/origin/Spain

app.get('/origin/:origin', (req, res) => {
  const origin = req.params.origin;
  // add lowercase to both origin and country
  const originCountry = wine.filter((item) => item.country === origin);
  res.json(originCountry);
});

// add query to get wines with score above 90 in particular country
// example http://localhost:8080/country/France?points=90
app.get('/country/:country', (req, res) => {
  const country = req.params.country;
  const points = req.query.points || 90; // if no query is added, default is 90
  const countryOrigin = wine.filter(
    (item) => item.country === country && item.points >= +points
  );
  res.json(countryOrigin);
});

//add query to get wine by variety
// example http://localhost:8080/variety/Chardonnay
app.get('/variety/:variety', (req, res) => {
  const variety = req.params.variety;
  const varietyWine = wine.filter((item) => item.variety === variety);
  res.json(varietyWine);
});

//list all the countries
// http://localhost:8080/countries
app.get('/countries', (req, res) => {
  const countries = wine.map((item) => item.country);
  const uniqueCountries = [...new Set(countries)];
  res.json(uniqueCountries);
});

// add query to get wine by price
// example http://localhost:8080/price?price=100
app.get('/price', (req, res) => {
  const price = req.query.price;
  const priceWine = wine.filter((item) => item.price === +price);
  res.json(priceWine);
});

// add query to get wine by price range
// example http://localhost:8080/price-range?min=100&max=200
app.get('/price-range', (req, res) => {
  const min = req.query.min;
  const max = req.query.max;
  const priceRangeWine = wine.filter(
    (item) => item.price >= +min && item.price <= +max
  );
  res.json(priceRangeWine);
});

// add query that uses RegEx to get wine by description
// example http://localhost:8080/description?description=aromas
app.get('/description', (req, res) => {
  const description = req.query.description;
  const descriptionWine = wine.filter((item) =>
    item.description.match(new RegExp(description, 'i'))
  );
  res.json(descriptionWine);
});

// implement sorting by points from high to low
// example http://localhost:8080/wines?sort=points
app.get('/wines', (req, res) => {
  const sort = req.query.sort;
  const sortWine = wine.sort((a, b) => {
    if (a[sort] < b[sort]) {
      return -1;
    }
    if (a[sort] > b[sort]) {
      return 1;
    }
    return 0;
  });
  res.json(sortWine);
});

// implement pagination
// example http://localhost:8080/wines?page=1&pageSize=10
app.get('/wines', (req, res) => {
  const page = req.query.page || 0;
  const pageSize = req.query.pageSize || 10;
  const startIndex = page * pageSize;
  const endIndex = startIndex + +pageSize;
  const wines = wine.slice(startIndex, endIndex);
  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: Math.ceil(wine.length / pageSize),
    results: wines,
  };
  res.json(returnObject);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
