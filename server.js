import express from "express";
import cors from "cors";
import blockchainjobs from "./data/blockchainjobs.json";

console.log(blockchainjobs.length)
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Ready to disply some blockchain data!");
});

app.get("/blockchainjobs", (req, res) => {
  res.json(blockchainjobs) // extraction of the whole data set which you imported
})

app.get("/jobtitles/:title", (req, res) => {
  const title = req.params.title

  const easyApply = req.query.easyapply
  console.log(easyapply)
  const allTitles = blockchainjobs.filter((item) => item.title === +title)
  res.json(allTitles)

  if(allTitles) {
    allTitles = allTitles.filter((item) => item.easyapply)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
