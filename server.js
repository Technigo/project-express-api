import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//My data for the Golden Globe endpoints  
import goldenGlobes from './data/golden-globes.json';

// For no results 
const ERROR_NOMINEES_NOT_FOUND = {error : 'No results found'}

const app = express();
 
// middlewares to anable cors and json nody parsing 
app.use(cors())
app.use(bodyParser.json())


// My routes 
app.get('/', ( request, response) => {
  response.send("Hello internet");
});

app.get('/goldenglobes' , (request, response) => {
  response.json(goldenGlobes);
});

 //get Golden Globe data based on name of nominee (movie or actor)
app.get('/goldenglobes/:name' , (request, response) => {
  const {name} = request.params;
  const filterdGoldenGlobes = goldenGlobes.filter(
    goldenGlobes => goldenGlobes.nominee === name);

  if(filterdGoldenGlobes.length === 0) {
    response.status(404).json(ERROR_NOMINEES_NOT_FOUND);
  } else {
    response.json(filterdGoldenGlobes); 
  }
});


//Checks is a specific person or film  was nominated a specific year
//Not great, because I think actors can be nominateed in several categorys 
app.get('/goldenglobes/:name/:year', (request, response) => {
  const {year, name} = request.params;
  const nominatedYear = goldenGlobes.find(
    (goldenGlobes) => +goldenGlobes.year_film === +year && goldenGlobes.nominee === name);

    if(!nominatedYear) {
      response.status(404).json(ERROR_NOMINEES_NOT_FOUND);
    } else {
      response.json(nominatedYear); 
    }
});


// Filters on year 
app.get('/years/:year', (request, response) => {
  const year = request.params.year
  const showWon = request.query.win
  let goldenGlobesFromYear = goldenGlobes.filter((goldenGlobes) => goldenGlobes.year_award === +year)

  if (showWon) {
    goldenGlobesFromYear = goldenGlobesFromYear.filter((goldenGlobes) => goldenGlobes.win)

  }

  response.json(goldenGlobesFromYear)
})

// Filters on winners 




app.listen(8080, () => {
  console.log('Its all working')
});