import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.send("Hello series!");
});

// This returns the entire array in Postman, just as it looks in the data folder, when posting http://localhost:8080/netflix-titles
app.get("/netflix-titles", (request, response) => {
  response.json(netflixData);
});

//This returns all the titles from the array, in Postman, when posting http://localhost:8080/netflix-titles/titles
app.get("/netflix-titles/titles", (request, response) => {
  const titles = netflixData.map((item) => item.title);
  response.json(titles);
});

// This returns the data for a specific show or film in Postman, when posting a link with the title in it, for example http://localhost:8080/netflix-titles/The Zoya Factor
app.get("/netflix-titles/:titleName", (request, response) => {
  const titleName = request.params.titleName;

  let seriesTitle = netflixData.filter((item) => item.title === titleName);
  response.json(seriesTitle);
});

app.get("/netflix-titles/directorcountry", (request, response) => {
  const directorCountry = netflixData.map((item) => ({
    director: item.director,
    country: item.country,
  }));
  response.json(directorCountry);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/// endpoint/:pathParam1/:pathParam2?queryParamName=queryParamValue&queryParam5Name=queryParam5Value&queryParam2Name=queryParam2Value
