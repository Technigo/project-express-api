import express from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';
import listEndpoints from 'express-list-endpoints';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Serve static files (CSS, images, etc.) from the "public" directory
app.use(express.static('public'));

// Defining your routes
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <!-- Link to your CSS file -->
        <link rel="stylesheet" type="text/css" href="/index.css">
      </head>
      <body>
        <h1>Welcome to My Express App</h1>
        <!-- Your other HTML content goes here -->
      </body>
    </html>
  `);
});

// All movies - return a collection of results (array of elements)
app.get('/titles', (req, res) => {
  res.json(netflixData);
});

// Single movie based on ID - return a single result (single element)
app.get('/titles/:id', (req, res) => {
  const { id } = req.params;
  const movie = netflixData.find((movie) => movie.show_id === +id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('No movie was found!');
  }
});

// Create a new movie - create a new resource
app.post('/titles', (req, res) => {
  const newMovie = req.body; // Assuming the request body contains the new movie data


  netflixData.push(newMovie);
  res.status(201).json(newMovie); // Respond with the created movie and 201 status code
});

// Update an existing movie - update a resource
app.put('/titles/:id', (req, res) => {
  const { id } = req.params;
  const updatedMovie = req.body; // Assuming the request body contains the updated movie data


  const index = netflixData.findIndex((movie) => movie.id === +id);

  if (index !== -1) {
    netflixData[index] = updatedMovie;
    res.json(updatedMovie);
  } else {
    res.status(404).send('No movie was found!');
  }
});

// Search for titles based on a query parameter
app.get('/search', (req, res) => {
  const { query } = req.query;

  // Example: Search for titles with matching names
  const searchResults = netflixData.filter((show) =>
    show.title.toLowerCase().includes(query.toLowerCase())
  );

  res.json(searchResults);
});

// Endpoint to get the list of all endpoints
app.get('/api-docs', (req, res) => {
  res.json(listEndpoints(app));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




