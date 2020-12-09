import express from 'express';

const app = express();

app.get('/', ( request, response) => {
  response.send("Hello internet");
});
 
app.listen(8080, () => {
  console.log("the server is runnin");

});