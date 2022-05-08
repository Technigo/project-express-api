import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import drivers from './data/drivers-csv.json';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// https://vanhaj-express-api.herokuapp.com/
app.get('/drivers', (req, res) => {
  const { driverId } = req.query;

  let allDrivers = drivers;

  if (driverId) {
    allDrivers = allDrivers.find((driver) => driver.driverId === +driverId);
  }

  res.status(200).json({
    data: allDrivers,
    sucess: true,
  });
});

// specific driver:
// https://vanhaj-express-api.herokuapp.com/drivers?driver=1
app.get('/drivers/driver/:driverId', (req, res) => {
  const { driverId } = req.params;

  const driverById = drivers.find((driver) => driver.driverId === +driverId);

  if (!driverById) {
    res.status(404).json({
      data: 'Not found',
      sucess: false,
    });
  } else {
    res.status(200).json({
      data: driverById,
      sucess: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
