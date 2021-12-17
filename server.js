import express from 'express';
import cors from 'cors';

import listEndpoints from 'express-list-endpoints';

import dragQueens from './data/drag-queens.json';

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
  res.send(
    "Hello hello hello! Welcome to Ru Paul's Dragrace! May the best woman win! To see all endpoints go to /endpoints"
  );
});

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

app.get('/queens', (req, res) => {
  res.json(dragQueens);
});

app.get('/queens/id/:id', (req, res) => {
  const { id } = req.params;
  const queenId = dragQueens.find((queen) => queen.id === +id);
  if (!queenId) {
    res.status(404).send("Sorry huney can't find your queen, try again");
  } else {
    res.json(queenId);
  }
});

app.get('/queens/name/:name', (req, res) => {
  const { name } = req.params;
  const queenName = dragQueens.find(
    (queen) => queen.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  );

  if (!queenName) {
    res.status(404).send("Sorry hunney can't find your queen, try again");
  } else {
    res.json(queenName);
  }
});

app.get('/queens/winners', (req, res) => {
  res.json(dragQueens.filter((queen) => queen.winner === true));
});

app.get('/queens/congeniality', (req, res) => {
  res.json(dragQueens.filter((queen) => queen.missCongeniality === true));
});

app.get('/queens/seasons/:seasons', (req, res) => {
  const { seasons } = req.params;
  const queensPerSeason = dragQueens.filter(
    (queen) => queen.seasons[0].seasonNumber === seasons
  );

  if (!queensPerSeason) {
    res.status(404).send("Sorry hunney, we don't have that season yet");
  } else {
    res.json(queensPerSeason);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
