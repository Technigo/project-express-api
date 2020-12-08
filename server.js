import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import data from './data/ted.json';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------------------------

// ALL TASKS
app.get('/', (req, res) => {
  res.json(data);
});

// SINGLE TALK
app.get('/talks/:slug', (req, res) => {
  const slug = req.params.slug;
  const url = `https://www.ted.com/talks/${slug}`;
  const filteredByUrl = data.filter((talk) => talk.url === url);
  res.json(filteredByUrl);
});

// SPEAKER
app.get('/speakers/', (req, res) => {
  const speaker = req.query.speaker;
  const filteredBySpeaker = data.filter((talk) =>
    talk.main_speaker.includes(speaker)
  );
  res.json(filteredBySpeaker);
});

// YEARLY EVENT
app.get('/events/:year', (req, res) => {
  const year = req.params.year;
  const filteredByYearOfEvent = data.filter(
    (talk) => talk.event === `TED${year}`
  );
  res.json(filteredByYearOfEvent);
});

// CATEGORY
app.get('/categories/', (req, res) => {
  if (typeof req.query.category === 'string') {
    const category = req.query.category;
    const filteredByCategory = data.filter((talk) =>
      talk.tags.includes(category)
    );
    res.json(filteredByCategory);
  } else {
    const categories = req.query.category;

    const filteredByMultipleCategories = categories.map((category) =>
      data.filter((talk) => talk.tags.includes(category))
    );
    res.json(filteredByMultipleCategories);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
