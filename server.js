import express, { query } from "express";
import cors from "cors";
import blockchainjobs from "./data/blockchainjobs.json";

console.log(blockchainjobs.length)
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); // saving where requests can come, form for safety : Cross-Origin Resourse Sharing()
app.use(express.json()); // abling to read the bodies in JSON

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({ responseMessage: "Ready to disply some blockchain data!" });
});

app.get("/blockchainjobs", (req, res) => {
  res.json(blockchainjobs) // extraction of the whole data set which you imported
})

app.get("/title/:title", (req, res) => {
  const title = req.params.title  // getting the value :title in to a variable
  const easyApply = req.query.easyApply
  console.log({ easyApply })
  let allTitles = blockchainjobs.filter((item) => item.Title === title)

  if (easyApply) {  // query  ?easyApply=true
    allTitles = allTitles.filter((item) => item.Easy_Apply)
  }

  res.status(200).json(allTitles)
  console.log({ title })
})

app.get("/company/:company", (req, res) => {
  const company = req.params.company
  const allCompanies = blockchainjobs.filter((item) => item.Company === company)
  res.status(200).json(allCompanies)
  console.log({ company })
})

app.get("/location/:location" , (req, res) => {
  const location = req.params.location
  const allLoc = blockchainjobs.filter((item) => item.Location === location)
  const city = req.query.Salary_Upper_Limit
  if (city) {
    allLoc = allLoc.filter((item) => item.Salary_Upper_Limit)
  }
  res.status(200).json(allLoc)
  console.log({ allLoc })
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// http://localhost:8080/blockchainjobs
// http://localhost:8080/blockchainjobs?Easy_apply=true