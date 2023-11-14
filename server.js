import express from 'express';
import cors from 'cors';
import avocadoSalesData from './data/avocado-sales.json';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Technigo!');
});

app.get('/sales', (req, res) => {
  res.json(avocadoSalesData);
});

app.get('/regions/:region', (req, res) => {
  const region = req.params.region.toLowerCase();
  const avocadoRegions = avocadoSalesData.filter((id) => id.region.toLowerCase() === region);
  console.log('message ', avocadoRegions);
  res.json(avocadoRegions);
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
