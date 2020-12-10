import express from 'express';

//My data for the Golden Globe endpoints  
import goldenGlobes from './data/golden-globes.json';


// For no results 
const ERROR_NOMINEES_NOT_FOUND = {error : 'No nominee results found'}


// This is where i create the endpoints 
const app = express();

app.get('/', ( request, response) => {
  response.send("Hello internet");
});

app.get('/goldenglobes' , (request, response) => {
  response.json(goldenGlobes);
});

app.get('/goldenglobes/:name' , (request, response) => {
  const {name} = request.params;
  //get Golden Globe data based on name of nominee (movie or actor)
  const filterdGoldenGlobes = goldenGlobes.filter(goldenGlobes => goldenGlobes.nominee === name);

  if(filterdGoldenGlobes.length === 0) {
    response.status(404).json(ERROR_NOMINEES_NOT_FOUND);
  } else {
    response.json(filterdGoldenGlobes); 
  }
});

//who won a specific category a specifiic year 
app.get('/goldenglobes/category/2009/win' , (request, response) => {
  response.json(goldenGlobes);
});



app.get('/goldenglobes/:year', ( request, response) => {
  //Dummy response for year search - if you would like to filter it like that 
});

 // My port <3 
app.listen(8080, () => {
  console.log("the server is runnin");

});