import express from "express";
import cors from "cors";
import ITsalaryData from "./data/IT-salary.json"


// The following defines the port the app will run on. Defaults to 8080,
// but can be overridden when starting the server (if needed). Example command to
// overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here ("req" = request, "res" = response)
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
  
});

// Get all developers, and sort by salary and work language:
app.get("/developers", (req, res) => {
  let developers = ITsalaryData;
  const salary = req.query.salary;
  const worklanguage = req.query.worklanguage;

  if (salary) {
    developers = ITsalaryData.filter((singleDeveloper) => {
      return singleDeveloper.yearly_salary === parseInt(salary);
    });
  }

  if (worklanguage) {
    developers = ITsalaryData.filter((singleDeveloper) => {
      return singleDeveloper.work_language.toLowerCase() === worklanguage.toLowerCase();
    })
  }

  res.send(developers);
});


// Get developers by gender:

app.get("/developers/:gender", (req, res) => {
  const gender = req.params.gender;
  const matchingDevelopers = ITsalaryData.filter((singleDeveloper) => {
    return singleDeveloper.gender.toLowerCase() === gender.toLowerCase();
  })

  if (matchingDevelopers.length > 0) {
    res.status(200).json({
      success: true,
      message: `Success! All ${gender} developers. Amount: ${matchingDevelopers.length}`,
      body: {
        developers: matchingDevelopers
      }
    });
  }
  else {
    res.status(404).json({
      success: false,
      message: "No developers found.",
      body: {}
    })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
