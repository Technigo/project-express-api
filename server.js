import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import tedData from './data/ted.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8088;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(tedData);
});

app.get('/talks/:url', (req, res) => {
  const paramString = req.params.url;
  const url = `https://www.ted.com/talks/${paramString}`;
  const filteredByUrl = tedData.filter((talk) => talk.url === url);
  res.json(filteredByUrl);
});

// app.get('/:year', (req, res) => {
//   const year = req.params.year;
//   const filteredByYearOfEvent = tedData.filter(
//     (talk) => talk.event === `TED${year}`
//   );
//   res.json(filteredByYearOfEvent);
// });

app.get('/:category', (req, res) => {
  const category = req.params.category;
  const filteredByCategory = tedData.filter((talk) =>
    talk.tags.includes(category)
  );
  res.json(filteredByCategory);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Hej Karin! igen');
});
