import express from "express";
import cors from "cors";
import data from './data/data.json'

const port = process.env.PORT || 8081;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Index route
app.get("/", (req, res) => {
  res.send("Search for data for the top 50 tech companies in the US!");
});

// Use http://localhost:8081/companies to get the full data for all companies
// https://project-express-api-cvzekbgn3q-lz.a.run.app/companies
app.get('/companies', (req, res) => {
  res.json(data)
})

// Use for example http://localhost:8081/companies/sectors?sectors=Software%20Infrastructureto get data for companies in different sectors
// https://project-express-api-cvzekbgn3q-lz.a.run.app/companies/sectors?sectors=software%20infrastructure
app.get('/companies/sectors', (req, res) => {
  const sectors = decodeURIComponent(req.query.sectors).toLowerCase()
  let companiesInSectors = data.filter((item) => item.sector.toLowerCase() === sectors)
  
  if (companiesInSectors.length === 0) {
    res.status(200).send(`None of the top 50 companies are in the ${sectors} sector`);
  } else {
    res.json(companiesInSectors);
  }
})

// Use for example http://localhost:8081/companies/apple%20inc. to get data for companies in different sectors
// https://project-express-api-cvzekbgn3q-lz.a.run.app/companies/apple%20inc.
app.get('/companies/:name', (req, res) => {
  const name = decodeURIComponent(req.params.name).toLowerCase();
  const company = data.find((item) => item.company_name.toLowerCase() === name);
  
  if (!company) {
    res.status(200).send(`None of the top 50 companies have the name ${name}`);
  } else {
    res.json(company);
  }
})

// Use for example http://localhost:8081/companies/states/california to get data for all companies with a HQ in California
// https://project-express-api-cvzekbgn3q-lz.a.run.app/companies/states/california
app.get('/companies/states/:state', (req, res) => {
  const states = decodeURIComponent(req.params.state).toLowerCase();
  const showSectors = req.query.sectors
  let companiesFromStates = data.filter((item) => item.hq_state.toLowerCase() === states)
  
  if (showSectors) {
    companiesFromStates = companiesFromStates.filter((item) => item.sectors)
  }
  
  if (companiesFromStates.length === 0) {
    res.status(200).send(`None of the top 50 companies has their HQ in: ${states}`);
  } else {
    res.json(companiesFromStates);
  }
})

// Use for example http://localhost:8081/companies/years/2004 to get data for all companies founded in 2004
// https://project-express-api-cvzekbgn3q-lz.a.run.app/companies/years/2004
app.get('/companies/years/:year', (req, res) => {
  const years = req.params.year
  const showYears = req.query.founding_year
  let companiesFoundedYears = data.filter((item) => item.founding_year === +years)
  
  if (showYears) {
    companiesFoundedYears = companiesFoundedYears.filter((item) => item.years)
  }
  
  if (companiesFoundedYears.length === 0) {
    res.status(200).send(`None of the top 50 companies were founded in the year ${years}`);
  } else {
    res.json(companiesFoundedYears);
  }
})

// Use for example http://localhost:8081/companies/sectors/software%20infrastructure/california to get data for companies
// in the software infrastructure sector with a HQ in California
// https://project-express-api-cvzekbgn3q-lz.a.run.app/companies/sectors/software%20infrastructure/california
app.get('/companies/sectors/:sector/:state', (req, res) => {
  const sectors = decodeURIComponent(req.params.sector).toLowerCase();
  const state = req.params.state.toLowerCase();
  let companiesInSectorsInStates = data.filter(
    (item) =>
      item.sector.toLowerCase() === sectors &&
      item.hq_state.toLowerCase() === state
  );

  if (companiesInSectorsInStates.length === 0) {
    res.status(200).send(
      `None of the top 50 companies match the provided ${sectors} sector and ${state} state criteria`
    );
  } else {
    res.json(companiesInSectorsInStates);
  }
});


// ERROR route
app.get('*', (req, res) => {
  res.send("Error route")
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});