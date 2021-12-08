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
  res.send('Hello world');
});

app.get('/episodes', (req, res) => {
  const { season, title, desc } = req.query;

  let theOfficeDataToSend = theOfficeData;

  if (season) {
    theOfficeDataToSend = theOfficeDataToSend.filter(
      item => item.season.toLowerCase().indexOf(season.toLowerCase()) !== -1
    ); // make the string not case sensitive
  }

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
  res.json({
    response: theOfficeDataToSend,
    success: true,
  });
});

// app.get('/songs/:title', (req, res) => {
//   const { title } = req.params;

//   const songId = theOfficeData.find(item => item.title === title);

//   if (!songId) {
//     console.log('no title found');
//     res.status(404).send('No song found with that title');
//   } else {
//     res.json(songId);
//   }
// });

// app.get('/songs/bpm/:bpm', (req, res) => {
//   const { bpm } = req.params;

//   const nameOfArtist = topMusicData.find(artist => artist.bpm === +bpm);

//   if (!nameOfArtist) {
//     console.log('no artist found');
//     res.status(404).send('No artist found with that name');
//   } else {
//     res.json(nameOfArtist);
//   }
// });

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
