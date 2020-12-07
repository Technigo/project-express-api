import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import tedData from './data/ted.json';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------------------------

// All tasks
app.get('/', (req, res) => {
  res.json(tedData);
});

// To get single talk
app.get('/talks/:slug', (req, res) => {
  const slug = req.params.slug;
  const url = `https://www.ted.com/talks/${slug}`;
  const filteredByUrl = tedData.filter((talk) => talk.url === url);
  res.json(filteredByUrl);
});

// Sort by yearly event
app.get('/events/:year', (req, res) => {
  const year = req.params.year;
  const filteredByYearOfEvent = tedData.filter(
    (talk) => talk.event === `TED${year}`
  );
  res.json(filteredByYearOfEvent);
});

// Sort by category
app.get('/:category', (req, res) => {
  const category = req.params.category;
  const filteredByCategory = tedData.filter((talk) =>
    talk.tags.includes(category)
  );

  // To add a second category
  const secondCategory = req.query.category;
  console.log(secondCategory);
  const addedCategory = filteredByCategory.filter((talk) =>
    talk.tags.includes(secondCategory)
  );

  if (secondCategory !== undefined) {
    res.json(filteredByCategory);
  } else {
    res.json(addedCategory);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
