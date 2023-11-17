import express from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';
import MarkdownIt from 'markdown-it';

// Defines the port the app will run on. Defaults to 8080.
const port = process.env.PORT || 8080;

// Import a module for listing all endpoints in the app
const app = require('express')();
const md = new MarkdownIt();

// Add middlewares to enable cors and json body parsing 
app.use(cors());
app.use(express.json());


// Default route to list all available endpoints in the app
app.get('/', (req, res) => {
    // MarkdownIt is a library for converting Markdown to HTML.
    // We use it here to render our API documentation in a more readable format.
  const documentation = `
  ## Endpoints
  
  ### 1. Get All Endpoints
  
  #### Request
  
  - **Method:** GET
  - **Path:** /
  
  #### Response
  
  - **Status Code:** 200 OK
  - **Body:** A JSON object listing all available endpoints in the application.
  
  ### 2. Get All Netflix Titles
  
  #### Request
  
  - **Method:** GET
  - **Path:** /titles
  
  #### Response
  
  - **Status Code:** 200 OK
  - **Body:** A JSON array containing all Netflix titles.
  
  ### 3. Get a Specific Title by ID
  
  #### Request
  
  - **Method:** GET
  - **Path:** /titles/:id
  
  #### Parameters
  
  - id (integer): The unique identifier of the title.
  
  #### Response
  
  - **Status Code:** 200 OK if the title is found, 404 Not Found otherwise.
  - **Body:** A JSON object representing the details of the specific title.
  
  ### 4. Get Titles in a Specific Category
  
  #### Request
  
  - **Method:** GET
  - **Path:** /titles/categories/:category
  
  #### Parameters
  
  - category (string): The category for which titles are requested.
  
  #### Response
  
  - **Status Code:** 200 OK if the category is found, 404 Not Found otherwise.
  - **Body:** A JSON object containing an array of titles in the specified category.
  
  ### 5. Get Titles of a Specific Type (Movie or TV Show)
  
  #### Request
  
  - **Method:** GET
  - **Path:** /titles/types/:type
  
  #### Parameters
  
  - type (string): The type of media (movie or TV show) for which titles are requested.
  
  #### Response
  
  - **Status Code:** 200 OK if the media type is found, 404 Not Found otherwise.
  - **Body:** A JSON object containing an array of titles of the specified type.
  
  ### 6. Get Titles from a Specific Country
  
  #### Request
  
  - **Method:** GET
  - **Path:** /titles/countries/:country
  
  #### Parameters
  
  - country (string): The country for which titles are requested.
  
  #### Response
  
  - **Status Code:** 200 OK if the country is found, 404 Not Found otherwise.
  - **Body:** A JSON object containing an array of titles from the specified country.
  
  ## Error Responses
  
  - **Status Code:** 404 Not Found
  - **Body:** An error message indicating that the requested resource was not found.
  
  - **Status Code:** 500 Internal Server Error
  - **Body:** An error message indicating that there was an internal server error.
  `;
  const htmlDocumentation = md.render(documentation);
  res.send(htmlDocumentation);
});

// Endpoint for all the data from netflixData
app.get('/titles', (req, res) => {
  res.json(netflixData);
  console.log(`Showing netliixdata`);
});

// Endpoint to fetch a specific title by its show_id
app.get('/titles/:id', (req, res) => {
  const id = req.params.id;
  const titleId = netflixData.find((titleId) => titleId.show_id === +id);

    // Respond with the details of the specific title otherwise send 404 status
  if (titleId) {
    res.json(titleId);
  } else {
    res.status(404).send('No title was found, please try again!');
  }
});

// Endpoint to fetch titles in a specific category
app.get('/titles/categories/:category', (req, res) => {
  const requestedCategory = req.params.category.toLowerCase();
  const mediaInCategory = netflixData.filter(media => media.listed_in.toLowerCase().includes(requestedCategory));
  const mediaTitles = mediaInCategory.map(media => media.title);

    // Respond with the titles in the specified category, otherwise send 404 status
    if (mediaTitles.length === 0) {
      res.status(404).send('Category not found, please try again!');
    } else {
      res.json({ mediaInCategory: mediaTitles });
    }
});

// Endpoint to fetch titles of a specific type (movie or TV show)
app.get('/titles/types/:type', (req, res) => {
  const requestedType = req.params.type.toLowerCase();
  const movieOrTvshow = netflixData.filter(typeOfMedia => typeOfMedia.type.toLowerCase().includes(requestedType));
  const mediaTitlesType = movieOrTvshow.map(typeOfMedia => typeOfMedia.title);

    // Respond with the titles of the specified type, otherwise send 404 status
  if (mediaTitlesType.length === 0){
    res.status(404).send('That is not an available media type, try movie or tv show please.');
  } else {
  res.json({ movieOrTvshow: mediaTitlesType });
  }
});

// Endpoint to fetch titles from a specific country
app.get('/titles/countries/:country', (req, res) => {
  const requestedCountry = req.params.country.toLowerCase();
  const mediaFromCountry = netflixData.filter(mediaCountry => mediaCountry.country.toLowerCase().includes(requestedCountry));
  const mediaTitlesCountry = mediaFromCountry.map(mediaCountry => mediaCountry.title);

    // Respond with the titles from the specified country, otherwise send 404 status
   if (mediaTitlesCountry.length === 0){
    res.status(404).send('That is not an available country, please try again!')
   } else {
    res.json({ mediaFromCountry: mediaTitlesCountry });
   }
});


// Start the server and log a message when it's running
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


