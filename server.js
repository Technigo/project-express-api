import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import data from './data/ted.json';

const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// --------------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.send('Welcome to TED-talks by Karin');
});

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// ALL TALKS
app.get('/talks/', (req, res) => {
  // FILTERED BY SPEAKER  ---------------------------------------------------------
  if (req.query.speaker) {
    const speaker = req.query.speaker;
    const filteredBySpeaker = data.filter((talk) =>
      talk.main_speaker.includes(speaker)
    );

    if (filteredBySpeaker.length === 0) {
      res
        .status(404)
        .send(
          `Sorry, couldn't find any talks by ${req.query.speaker}. Try again! (or find the whole list of speakers under /speakers)`
        );
    } else {
      res.json(filteredBySpeaker);
    }
  } else if (req.query.category) {
    // FILTERED BY ONE OR MORE CATEGORIES ----------------------------------------
    // If there is one category in the query -------
    if (typeof req.query.category === 'string') {
      const category = req.query.category;
      const filteredByCategory = data.filter((talk) =>
        talk.tags.includes(category)
      );

      if (filteredByCategory.length === 0) {
        res
          .status(404)
          .send(
            `Sorry, couldn't find any talks matching your search. Try again!`
          );
      } else {
        res.json(filteredByCategory);
      }
    } else {
      // If there are multiple categories in the query -------
      const categories = req.query.category;

      // Filter talks by checking whether the category/categories that the user wrote
      // is present in the talk or not, return only those in which it is
      const multipleCategories = data.filter((item) => {
        const booleanArray = categories.map((category) => {
          if (item.tags.includes(category)) {
            return true;
          }
          return false;
        });
        if (!booleanArray.includes(false)) {
          return true;
        }
      });
      if (multipleCategories.length === 0) {
        res
          .status(404)
          .send(
            `Sorry, couldn't find any talks matching your search. Try again!`
          );
      } else {
        res.json(multipleCategories);
      }
    }
  } else if (req.query.event) {
    // FILTERED BY EVENT ---------------------------------------------------------
    const event = req.query.event;
    const filteredByEvent = data.filter((talk) => talk.event === event);

    if (filteredByEvent.length === 0) {
      res
        .status(404)
        .send(
          `Sorry, couldn't find any talks matching your search. Try again!`
        );
    } else {
      res.json(filteredByEvent);
    }
  } else {
    res.json(data);
  }
});

// SINGLE TALK ---------------------------------------------------------
app.get('/talks/:id', (req, res) => {
  const id = req.params.id;
  const filteredById = data.filter((talk) => talk.id === id);

  if (filteredById.length === 0) {
    res
      .status(404)
      .send(`Sorry, couldn't find any talks matching that id. Try again!`);
  } else {
    res.json(filteredById);
  }
});

// ALL SPEAKERS ---------------------------------------------------------
app.get('/speakers', (req, res) => {
  const allSpeakers = data.map((talk) => talk.main_speaker);
  // New set to remove all dublicates
  const allSpeakersSet = Array.from(new Set(allSpeakers)).sort();

  if (allSpeakersSet.length === 0) {
    res.status(404).send(`Sorry, couldn't find any speakers. Try again!`);
  } else {
    res.json(allSpeakersSet);
  }
});

// ALL EVENTS ---------------------------------------------------------
app.get('/events', (req, res) => {
  const allEvents = data.map((talk) => talk.event);
  // New set to remove all dublicates
  const allEventsSet = Array.from(new Set(allEvents)).sort();

  if (allEventsSet.length === 0) {
    res.status(404).send(`Sorry, couldn't find any events. Try again!`);
  } else {
    res.json(allEventsSet);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
