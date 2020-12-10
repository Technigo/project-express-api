import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import goldenGlobesData from './data/golden-globes.json'
//console.log(goldenGlobesData)

// Define the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
// Initialize a new server
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Generic error message
const ERROR_NOT_FOUND = {error : "Sorry, we can't find what you are looking for."}

// First route here
app.get('/', (request, response) => {
  response.send('Hello world again')
});

// Define the method - GET. Give it a path - 'nominations'. Handle the response: get 
// all data and send as a json response to client.
// The url: /nominations
app.get('/nominations', (request, response) => {
  response.json(goldenGlobesData)
});

// Return only one object using filter() and find() to get yearly winners from various categories.
// const year and category lets us get the input value from the placeholder year and category, 
// and then we can filter our data using year and category.

// url: /category/[category name]/year/[year]?win=true
// The url without the query: returns all nominees for category and year

app.get('/category/:category/year/:year', (request, response) => {
  const { category, year } = request.params;
  const showWon = request.query.win

  let bestCategoriesFromYear = goldenGlobesData.filter(item => {
    return (
      item.category === category && item.year_award === +year
    )
  });

// Tried < 0 but got an empty array back. Cause filter returns an array.
  if (bestCategoriesFromYear < 1) {
    response.status(404).json(ERROR_NOT_FOUND);
  } else if (showWin) {
    bestCategoriesFromYear = bestCategoriesFromYear.find((item) => item.win)
  }
    response.json(bestCategoriesFromYear) 
});

// First year is the path, second year is a placeholder for a value. Filters on year and winners.
// The url: /year/[year]?win=true
app.get('/year/:year', (request, response) => {
  const year = request.params.year
  const showWon = request.query.win
  console.log(showWon)

  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year);
  
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  } 
  response.json(nominationsFromYear)
});

// DUMMY ENDPOINTS

// Endpoint: All winning lead tv-series actors from a particular year. Not sure how
// to use categories twice - to get both male and female actors.
// url: /category/:category/category/:category/year?win=true

// Endpoint: All winning female movie actors and name of their films from a particular category
// url: /category/:[best female movie actor-category]?win=true
// This gives me the winners but I want to return also the film they acted in. Can I use a query 
// to get the film name? Or filter() - go over each winner in array and return winner and name of their film.
// That should work? Not sure.

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

{/*find() vs filter():
find() returns the winner from category and year WITHOUT the query: win=true. This since it returns the first match which also happens to be the winner in this particular structure of data (a structure we cannot control). This is a un-reliable method in this case.
filter() returns the winner only with a query. This is more reliable.
*/}
