import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

import data from './data/ted.json';

const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// --------------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.json(
    'Welcome to TED-talks API - by Karin! Read full documentation here: 👉 https://github.com/karinnordkvist/Technigo-16-24-API/blob/master/Documentation.md, to see all endpoints, go to /endpoints.'
  );
});

// ALL TALKS
app.get('/talks', (req, res) => {
  if (req.query.speaker) {
    // FILTERED BY SPEAKER  ---------------------------------------------------------
    const speaker = req.query.speaker;
    const filteredBySpeaker = data.filter((talk) =>
      talk.main_speaker.includes(speaker)
    );

    if (filteredBySpeaker.length === 0) {
      res
        .status(404)
        .json(
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
          .json(
            `Sorry, couldn't find any talks matching '${category}'. Try again!`
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
        const includesCategory = categories.map((category) => {
          if (item.tags.includes(category)) {
            return true;
          }
          return false;
        });
        if (!includesCategory.includes(false)) {
          return true;
        }
      });
      if (multipleCategories.length === 0) {
        res
          .status(404)
          .json(
            `Sorry, couldn't find any talks matching '${categories}'. Try again!`
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
        .json(`Sorry, couldn't find any talks matching '${event}'. Try again!`);
    } else {
      res.json(filteredByEvent);
    }
  } else {
    // Adding pages with 50 talks per page
    const page = req.query.page ?? 1;
    const pageSize = 50;
    const startIndex = page * pageSize - pageSize;
    const endIndex = startIndex + pageSize;
    const talksForPage = data.slice(startIndex, endIndex);
    const returnData = {
      Page: `${page}/${data.length / pageSize}`,
      Talks: `${startIndex}-${endIndex}`,
      'Total amount of talks': data.length,
      data: talksForPage,
    };
    res.json(returnData);
  }
});

// SINGLE TALK BY ID -----------------------------------------------------
app.get('/talks/:id', (req, res) => {
  const id = req.params.id;
  const filteredById = data.find((talk) => JSON.stringify(talk.id) === id);

  if (filteredById.length === 0) {
    res
      .status(404)
      .json(`Sorry, couldn't find any talk matching that id. Try again!`);
  } else {
    res.json({
      name: filteredById.name,
      data: filteredById,
    });
  }
});

// ALL SPEAKERS ---------------------------------------------------------
app.get('/speakers', (req, res) => {
  const allSpeakers = data.map((talk) => talk.main_speaker);
  // New set to remove all dublicates
  const allSpeakersSet = Array.from(new Set(allSpeakers));

  if (allSpeakersSet.length === 0) {
    res.status(404).json(`Sorry, couldn't find any speakers. Try again!`);
  } else {
    res.json({
      'Total amount of categories': allSpeakersSet.length,
      data: allSpeakersSet,
    });
  }
});

// TALKS BY SPEAKER ---------------------------------------------------------
app.get('/speakers/:speaker/talks', (req, res) => {
  const speaker = req.params.speaker;
  const talksBySpeaker = data.filter((talk) => talk.main_speaker === speaker);
  if (talksBySpeaker.length === 0) {
    res
      .status(404)
      .json(`Sorry, couldn't find any talks matching that speaker. Try again!`);
  } else {
    res.json({
      'amount of talks': talksBySpeaker.length,
      data: talksBySpeaker,
    });
  }
});

// ALL EVENTS ---------------------------------------------------------
app.get('/events', (req, res) => {
  const allEvents = data.map((talk) => talk.event);
  // New set to remove all dublicates
  const allEventsSet = Array.from(new Set(allEvents));

  if (allEventsSet.length === 0) {
    res.status(404).json(`Sorry, couldn't find any events. Try again!`);
  } else {
    res.json({
      'Total amount of events': allEventsSet.length,
      data: allEventsSet,
    });
  }
});

// TALKS BY EVENT ---------------------------------------------------------
app.get('/events/:event/talks', (req, res) => {
  const event = req.params.event;
  const talksByEvent = data.filter((talk) => talk.event === event);
  if (talksByEvent.length === 0) {
    res
      .status(404)
      .json(
        `Sorry, couldn't find any talks matching that event name. Try again!`
      );
  } else {
    res.json({
      'amount of talks': talksByEvent.length,
      data: talksByEvent,
    });
  }
});

// ALL CATEGORIES ---------------------------------------------------------
let newData = null;

// Parse entire file to parse tags-string
fs.readFile('./data/ted.json', 'utf8', (err, fileContents) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    newData = JSON.parse(fileContents);
    newData = Array.of(
      newData.map((content) => content.tags).join(', ')
    ).map((item) => item.replace(/\[/g, '').replace(/]/g, ''));
  } catch (err) {
    console.error(err);
  }
});

app.get('/categories', (req, res) => {
  const allCategories = newData.map((item) => item.replace(/,/g, ''));
  const all = allCategories[0]
    .split('"')
    .reduce((unique, item) =>
      unique.includes(item) ? unique : [...unique, item, null]
    )
    .filter((item) => item !== null)
    .filter((item) => item.length > 1);

  if (allCategories.length === 0) {
    res.status(404).json(`Sorry, couldn't find any categories. Try again!`);
  } else {
    res.send({
      'Total amount of categories': all.length,
      data: all,
    });
  }
});

// ENDPOINTS ---------------------------------------------------------
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
