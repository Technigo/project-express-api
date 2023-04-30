import express from "express";
import cors from "cors";
import data from './data/data.json'

const port = process.env.PORT || 8081;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Index route
app.get("/", (req, res) => {
  res.send("Search for data for the top 50 tech companies in the US!");
});

// Use http://localhost:8081/companies to get the full data for all companies
app.get('/companies', (req, res) => {
  res.json(data)
})

// Use for example http://localhost:8081/companies/name?name=Apple%20Inc. to get data for companies in different sectors
app.get('/companies/names', (req, res) => {
  const names = req.query.names.toLowerCase()
  let companiesNames = data.filter((item) => item.company_name.toLowerCase() === names)
  
  if (companiesNames.length === 0) {
    res.status(404).send(`None of the top 50 companies have the name ${names}`);
  } else {
    res.json(companiesNames);
  }
})

// Use for example http://localhost:8081/companies/sector?sector=Software%20Infrastructure to get data for companies in different sectors
app.get('/companies/sectors', (req, res) => {
  const sectors = req.query.sectors.toLowerCase()
  let companiesInSectors = data.filter((item) => item.sector.toLowerCase() === sectors)
  
  if (companiesInSectors.length === 0) {
    res.status(404).send(`None of the top 50 companies are in the ${sectors} sector`); //This catches if no HQ's are in the provided state
  } else {
    res.json(companiesInSectors);
  }
})

// Use for example http://localhost:8081/companies/state/California to get data for all companies with a HQ in California
app.get('/companies/states/:state', (req, res) => {
  const states = req.params.state.toLowerCase()
  const showSectors = req.query.sectors
  let companiesFromStates = data.filter((item) => item.hq_state.toLowerCase() === states)
  
  if (showSectors) {
    companiesFromStates = companyFromStates.filter((item) => item.sectors)
  }
  
  if (companiesFromStates.length === 0) {
    res.status(404).send(`None of the top 50 companies has their HQ in: ${states}`); //This catches if no HQ's are in the provided state
  } else {
    res.json(companiesFromStates);
  }
})

// Use for example http://localhost:8081/companies/year/2004 to get data for all companies founded in 2004
app.get('/companies/years/:year', (req, res) => {
  const years = req.params.year
  const showYears = req.query.founding_year
  let companiesFoundedYears = data.filter((item) => item.founding_year === +years)
  
  if (showYears) {
    companiesFoundedYears = companiesFoundedYears.filter((item) => item.years)
  }
  
  if (companiesFoundedYears.length === 0) {
    res.status(404).send(`None of the top 50 companies were founded in the year ${years}`); //This catches if no HQ's are in the provided state
  } else {
    res.json(companiesFoundedYears);
  }
})

// Use for example http://localhost:8081/companies/sector/software%20infrastructure/california to get data for companies
// in the software infrastructure sector with a HQ in California
app.get('/companies/sectors/:sector/:state', (req, res) => {
  const sectors = req.params.sector.toLowerCase()
  const showStates = req.params.state.toLowerCase()
  let companiesInSectorsInStates = data.filter((item) => item.sector.toLowerCase() === sectors)
  
  if (showStates) {
    companiesInSectorsInStates = companiesInSectorsInStates.filter((item) => item.hq_state.toLowerCase() === showStates.toLowerCase());
  }
  
  if (companiesInSectorsInStates.length === 0) {
    res.status(404).send(`None of the top 50 companies match the provided ${sectors} sector and ${showStates} state criteria`); //This catches if no HQ's are in the provided state
  } else {
    res.json(companiesInSectorsInStates);
  }
})


// ERROR route
app.get('*', (req, res) => {
  res.send("Error route")
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});