import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import goldenGlobesData from './data/golden-globes.json'
//console.log(goldenGlobesData)

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (request, response) => {
  response.send('Hello world again')
});

// Define the method - get. Give it a path - nominations. Handle the
// response
// Get all data and send as a json response to client
app.get('/nominations', (request, response) => {
  response.json(goldenGlobesData)
});

// 1 year is the path, 2 year is a placeholder for a variable
app.get('/year/:year', (request, response) => {
  const year = request.params.year
  const showWon = request.query.win
  console.log(showWon)
  //console.log({ year })
  // /year/2010
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  // /year/2011?win=true
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  response.json(nominationsFromYear)
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
