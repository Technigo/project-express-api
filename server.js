import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import netflixData from './data/netflix-titles.json';

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
app.use(bodyParser.json());


// Start defining your routes here. request is incoming and response is outgoing.
app.get('/', (request, response) => {
  response.send('Hello fellow user! Here is a Netflix API where you can find data about Movies and TV shows on Netflix. Enjoy!');
})

//Here we are using query parameter so you can search only movies or only tv-shows like this 
//:localhost:8080/titles?type=Movie
app.get('/titles', (request, response) => {
  const { type } = request.query;
  if (type) {
    const filteredTitles = netflixData.filter(title => title.type === type);
    response.json(filteredTitles);
  } else  {
    response.json(netflixData);
  }
});


//Here we are using path parameter to get only one title that has the exact ID
app.get('titles/:id', (request, response) => {
  const { id } = request.params;
  console.log(request.params);
  const title = netflixData.find(title => +title.show_id === +id);
  response.json(title);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
