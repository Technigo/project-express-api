import express from 'express';
import cors from 'cors';
import goldenGlobesData from './data/golden-globes.json';

// Checking the length of the array, ie how many entries => console.log(goldenGlobesData.length);

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

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
  res.send('Hello my future API');
});

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData);
});

// + in front of year to make the string in to a number like in the array
// app.get('/year/:year', (req, res) => {
//   const year = req.params.year;
//   // console.log({ year });
//   const nominationsFromYear = goldenGlobesData.filter(
//     (item) => item.year_award === +year
//   );
//   res.json(nominationsFromYear);
// });

app.get('/year/:year', (req, res) => {
  const year = req.params.year;
  const showWon = req.query.won;
  let nominationsFromYear = goldenGlobesData.filter(
    (item) => item.year_award === +year
  );
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }
  res.json(nominationsFromYear);
});
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
