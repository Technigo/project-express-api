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
  /*const q = req.query
  q.page
  blockchainjobs.slice(() =>)*/

  res.json(blockchainjobs) // extraction of the whole data set which you imported
})

app.get("/blockchainjobs/:title", (req, res) => { //  /blockchainjobs/consultant
  const title = req.params.title  // getting the value :title in to a variable
  const easyApply = req.query.easyApply
  console.log({ easyApply })
  let allTitles = blockchainjobs.find((item) => // finding the first jobtitle of the list individually
    item.Title.toLowerCase() === title.toLowerCase())

  if (!allTitles) {
    res.json("Error, please check your jobtitle again.")
  } else {
    res.status(200).json(allTitles)
  }
  
})

app.get("/company/:company", (req, res) => {
  const company = req.params.company
  const allCompanies = blockchainjobs.filter((item) => item.Company.toLocaleLowerCase() === company.toLocaleLowerCase())
  res.status(200).json(allCompanies)
  console.log({ company })
})

app.get("/location", (req, res) => {
  const { salarylowerlimit, location } = req.query
  let all = blockchainjobs

  let info = blockchainjobs.filter((item) => // example: location?salarylowerlimit=200000
  item.Salary_Lower_Limit.toString() === salarylowerlimit.toString())
  console.log({ info })

  res.status(200).json({info})
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// http://localhost:8080/blockchainjobs                               *the data fully available*
// http://localhost:8080/blockchainjobs?easyapply=true                *accesing through query*
// http://localhost:8080/location?salarylowerlimit=200000             *accesing through query, editing limit will show different data*
// http://localhost:8080/blockchainjobs/consultant                    *pulling out specific jobtitle*