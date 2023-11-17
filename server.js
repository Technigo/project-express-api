import express from 'express';
import cors from 'cors';
import avocadoSalesData from './data/avocado-sales.json';
import listEndpoints from 'express-list-endpoints';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// Endpoint to return API documentation
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// Endpoint to return a collection of results (array of elements)
app.get('/sales', (req, res) => {
  res.json(avocadoSalesData);
});

// Endpoint to return a single result (single element) based on ID
app.get('/sales/:id', (req, res) => {
  // Retrieve the "id" parameter from the request.
  const id = req.params.id;
  // Use the find method to locate the avocado sales object with the specified "id".
  // '+id' converts 'id' to a number because the parameter is always passed as a string.
  const avocadoSaleById = avocadoSalesData.find((item) => item.id === +id);
  if (avocadoSaleById) {
    res.json(avocadoSaleById);
  } else {
    res.status(404).json({ message: 'Sale no found' });
  }
});

// Endpoint to return results based on region
app.get('/regions/:region', (req, res) => {
  // Retrieve the parameter from the request named 'region' and convert it to lowercase (case-insensitive).
  const region = req.params.region.toLowerCase();
  // Filter avocado sales data based on the specified region.
  // The variable avocadoRegions will contain an array of objects matching the specified region.
  const avocadoRegions = avocadoSalesData.filter((item) => item.region.toLowerCase() === region);
  console.log('message ', avocadoRegions);
  // Return the result in JSON format, which includes avocado sales data for the specified region.
  res.json(avocadoRegions);
});

// Endpoint to return a limited number of results using slice
app.get('/sales/limited/:limit', (req, res) => {
  // Retrieve the "limit" parameter from the request and convert it to a number.
  const limit = parseInt(req.params.limit);
  // Use slice to return a limited number of avocado sales records.
  const limitedAvocadoSales = avocadoSalesData.slice(0, limit);
  // Return the result in JSON format, which includes a limited number of avocado sales records.
  res.json(limitedAvocadoSales);
});

// Endpoint to return a limited number of results using slice
app.get('/sales/limited/:limit', (req, res) => {
  // Retrieve the "limit" parameter from the request and convert it to a number.
  const limit = req.params.limit;
  // Use slice to return a limited number of avocado sales records.
  const limitedAvocadoSales = avocadoSalesData.slice(0, limit);
  // Return the result in JSON format, which includes a limited number of avocado sales records.
  res.json(limitedAvocadoSales);
});

// Empty endpoint for future operations
app.post('/dummy', (req, res) => {
  res.json({ message: 'This is an empty endpoint for future operations' });
});

// Empty endpoint with dynamic parameter
app.get('/dummy/:param', (req, res) => {
  const paramValue = req.params.param;
  res.json({ message: `To jest pusty endpoint z parametrem: ${paramValue}` });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
