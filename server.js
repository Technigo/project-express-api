import express, { request, response } from "express";
import cors from "cors";


import goldenGlobesData from "./data/golden-globes.json";
import res from "express/lib/response";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.send("And the nominees are...!");
});

// Endpoint that shows nominees with a choice of year/nominee/win/query
app.get("/nominees", (req, res) => {
  const { year_award, nominee, win, category } = req.query;

  let selectNominations = goldenGlobesData;

  if (year_award) {
    selectNominations = selectNominations.filter(
      (item) => item.year_award === +year_award
    );
  }
  if (nominee) {
    selectNominations = selectNominations.filter(
      (item) => item.nominee.toLowerCase() === nominee.toLowerCase()
    );
  }
  if (win) {
    selectNominations = selectNominations.filter((item) => 
      item.win === true);
  }
  if (category) {
    selectNominations = selectNominations.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (selectNominations.length === 0) {
    res
      .status(404)
      .json("Sorry, we can't find any nominations for your chosen combination");
  } else {
    res.status(200).json({
      data: selectNominations,
      success: true,
    });
  }
}); 

// Endpoint that lists all nominees for a category
app.get("/nominees/categories/:category", (request, response) => {
  const { category } = request.params; 

  const goldenGlobesByCategory = goldenGlobesData.filter(golden => golden.category.toLowerCase() === category.toLowerCase());
  
  if (!goldenGlobesByCategory) {
    response.status(404).json({
      data: "Not found",
      success: false
    });
  } else {
    response.status(200).json({
      data: goldenGlobesByCategory,
      success: true
    });
  }
});

// Endpoint that lists all the Golden Globe winners
app.get("/nominees/winners", (request, response) => {
  const filteredNominees = goldenGlobesData.filter(nominee => nominee.win === true)
  response.send(filteredNominees)
})

// Endpoint that lists all nominees for a year they were nominated, not release year
app.get("/nominees/:year", (request, response) => {
  const { year } = request.params
  const filteredNominees = goldenGlobesData.filter(nominee => nominee.year_award === +year)

  // Handling year out of range
  if (filteredNominees.lenght === 0) {
    response.status(404).json({
      data: "Not found",
      success: false
    });  
  } else {
    response.send(filteredNominees)
  }
})

// Endpoint that lists all nominees for a year they were released
app.get("/nominees/year/:released", (request, response) => {
  const { released } = request.params
  const filteredNominees = goldenGlobesData.filter(nominee => nominee.year_film === +released)

  // Handling year out of range
  if (filteredNominees.lenght === 0) {
    response.status(404).json({
      data: "Not found",
      success: false
    });  
  } else {
    response.send(filteredNominees)
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Hello World! running on http://localhost:${port}`);
});
