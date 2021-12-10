/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-const-assign */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json';
// import topMusicData from './data/top-music.json';
import theOfficeData from './data/the-office.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

app.get('/', (req, res) => {
  const { title, desc, imdb_rating, original_air_date } = req.query;

  let theOfficeDataToSend = theOfficeData;

  // if (season) {
  //   theOfficeDataToSend = theOfficeDataToSend.filter(
  //     item => item.season.toString().indexOf(season.toString()) !== -1
  //   ); // make the string not case sensitive
  // }

  if (title) {
    theOfficeDataToSend = theOfficeDataToSend.filter(
      item => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }

  if (desc) {
    theOfficeDataToSend = theOfficeDataToSend.filter(
      item => item.desc.toLowerCase().indexOf(desc.toLowerCase()) !== -1
    );
  }
  if (imdb_rating) {
    theOfficeDataToSend = theOfficeDataToSend.filter(
      // eslint-disable-next-line camelcase
      item => item.imdb_rating.toString().indexOf(imdb_rating.toString()) === 0
    );
  }

  if (!imdb_rating) {
    res.status(404).send('no rating included');
  }

  if (original_air_date) {
    theOfficeDataToSend = theOfficeDataToSend.filter(
      // eslint-disable-next-line camelcase
      item => item.original_air_date.indexOf(original_air_date) !== -1
    );
  }

  res.json(theOfficeDataToSend);

  // res.json({
  //   response: theOfficeDataToSend,
  //   success: true,
  // });
});

app.get('/season/:season', (req, res) => {
  //:index is called path params, javaScript reads fundings/:index like fundings/"there will be a parameter here" and not actual "index"
  const season = req.params.season;

  const officeSeason = theOfficeData.find(
    seasonNumber => seasonNumber.season === +season
  ); // the plus converts the index into a number from a string

  if (!officeSeason) {
    console.log('No company found');
    res.status(404).send('No company found with that index');
  } else {
    res.json(officeSeason);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
