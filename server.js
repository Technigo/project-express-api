import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import netflixData from './data/netflix-titles.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const ERROR = { error: 'Request not found'};

//Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());


// Routes. Request is incoming and Response is outgoing.
app.get('/', (request, response) => {
  response.send('Hello fellow user! Here is a Netflix API where you can find data about Movies and TV shows on Netflix. Enjoy!');
});

//Here we are using query parameter so you can search only movies or only tv-shows like this 
//:localhost:8080/titles?type=Movie
app.get('/titles', (request, response) => {
  const { type } = request.query;
  if (type) {
    const filteredTitles = netflixData.filter((title) => title.type === type);
    response.json(filteredTitles);
  } else  {
    response.json(netflixData);
  }
});


//Here we are using path parameter to get only one title that has the exact ID
app.get('/titles/id/:id', (request, response) => {
  const { id } = request.params;
  // console.log(id);
  const title = netflixData.find(title => title.show_id === +id);
  if (!title) {
    response.status(404).json(ERROR);
    } else {
    response.json(title);
    }
});

//Here we are using path parameter to get all titles for a specific release year
app.get('/titles/year/:year', (request, response) => {
  const { year } = request.params;
  // console.log(year);
  const titlesOfYear = netflixData.filter(title => title.release_year === +year);
  response.json(titlesOfYear);
});

//Here we are using path parameter to get all movies for a specific release year
// app.get('/titles', (request, response) => {
//   const { type } = request.query;
//   if (type) {
//     const filteredTitles = netflixData.filter((title) => title.type === type);
//     response.json(filteredTitles);
//   } else  {
//     response.json(netflixData);
//   }
// });

//Here we are using path parameter to get all TV-shows for a specific release year


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
