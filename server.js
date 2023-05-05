import express from "express";
import cors from "cors";
import ITsalaryData from "./data/IT-salary.json"


// The following defines the port the app will run on. Defaults to 8080,
// but can be overridden when starting the server (if needed). Example command to
// overwrite PORT env variable value: PORT=9000 npm start:
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing:
app.use(cors());
app.use(express.json());


// Start defining your routes here ("req" = request, "res" = response):
app.get("/", (req, res) => {
  res.json({responseMessage: "Welcome to the IT Professional salary API!",
    data: listEndpoints(app)
  });
});

// Get all developers, and sort by salary and work language:
app.get("/professionals", (req, res) => {
  let professionals = ITsalaryData;
  const salary = req.query.salary;
  const worklanguage = req.query.worklanguage;

  if (salary) {
    professionals = ITsalaryData.filter((singleProfessional) => {
      return singleProfessional.yearly_salary === parseInt(salary);
    });
  }

  if (worklanguage) {
    professionals = ITsalaryData.filter((singleProfessional) => {
      return singleProfessional.work_language.toLowerCase() === worklanguage.toLowerCase();
    })
  }

  res.send(professionals);
});


// Sort salaries by highest to lowest:
app.get("/professionals/highesttolowest", (req, res) => {
  let professionals = ITsalaryData;
  const sortedProfessionals = professionals.sort((a, b) => b.yearly_salary - a.yearly_salary);

  if (sortedProfessionals.length > 0) {
    res.status(200).json({
      success: true,
      message: `Success! Salaries ordered from highest to lowest.`,
      body: {
        professionals: sortedProfessionals
      }
    });
  }
  else {
    res.status(404).json({
      success: false,
      message: "No IT professionals found.",
      body: {}
    })
  }
});

// Sort salaries by lowest to highest:
app.get("/professionals/lowesttohighest", (req, res) => {
  let professionals = ITsalaryData;
  const sortedProfessionals = professionals.sort((a, b) => a.yearly_salary - b.yearly_salary);

  if (sortedProfessionals.length > 0) {
    res.status(200).json({
      success: true,
      message: `Success! Salaries ordered from lowest to highest.`,
      body: {
        professionals: sortedProfessionals
      }
    });
  }
  else {
    res.status(404).json({
      success: false,
      message: "No IT professionals found.",
      body: {}
    })
  }
});

// Filter developers by gender:
app.get("/professionals/:gender", (req, res) => {
  const gender = req.params.gender;
  const matchingProfessionals = ITsalaryData.filter((singleProfessional) => {
    return singleProfessional.gender.toLowerCase() === gender.toLowerCase();
  })

  if (matchingProfessionals.length > 0) {
    res.status(200).json({
      success: true,
      message: `Success! All ${gender} IT professionals. Amount: ${matchingProfessionals.length}`,
      body: {
        professionals: matchingProfessionals
      }
    });
  }
  else {
    res.status(404).json({
      success: false,
      message: "No IT professionals found.",
      body: {}
    })
  }
});

// Start the server:
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
