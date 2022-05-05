import express from "express";
import cors from "cors";

import goldenGlobesData from "./data/golden-globes.json";

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
  res.send("Hello Technigo!");
});

//ALL NOMINATIONS WITH CHOICES YEAR/NOMINEE/WIN//QUERY//WORKS
app.get("/nominations", (req, res) => {
  const { year_award, nominee, win } = req.query;

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
    selectNominations = selectNominations.filter((item) => item.win === true);
  }

  if (selectNominations.length === 0) {
    res
      .status(404)
      .json("Sorry, we can´t find any nominations for your chosen combination");
  } else {
    res.status(200).json({
      data: selectNominations,
      success: true,
    });
  }
});

//SEARCH FOR IF A SPECIFIC FILM/PERSON EVER BEEN NOMINATED ONE OR SEVERAL TIMES//WORKS
app.get("/nominations/:nominee", (req, res) => {
  const nominee = req.params.nominee;
  const filmNominees = goldenGlobesData.filter(
    (movie) => movie.nominee.toLocaleLowerCase() === nominee.toLocaleLowerCase()
  );

  if (filmNominees.length === 0) {
    res.status(404).json(`Sorry, we can´t find any nomination for ${nominee} `);
  } else {
    res.status(200).json(filmNominees);
  }
});

//SEARCH BOTH NOMINEE AND CATEGORY//WORKS
app.get("/test", (request, response) => {
  const { nominee, category } = request.query;
  let testfilter = goldenGlobesData;

  if (nominee) {
    testfilter = testfilter.filter((item) =>
      item.nominee.toLocaleLowerCase().includes(nominee.toLocaleLowerCase())
    );
  }
  if (category) {
    testfilter = testfilter.filter((item) =>
      item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())
    );
  }

  if (testfilter.length === 0) {
    response.status(404).json("Sorry");
  } else {
    response.json(testfilter);
  }
}),
  //SEARCH ON CATEGORIES//CASE WITH BUTTONS(NO SEARCHFIELD)//WORKS
  app.get("/categories/:category", (req, res) => {
    const category = req.params.category;
    const categorySearch = goldenGlobesData.filter(
      (item) => item.category === category
    );

    res.status(200).json(categorySearch);
  });

//RETURNS ALL WINNERS, FILTER IN A SPECIFIC CATEGORY AND YEAR(QUERY)//WORKS
app.get("/winners", (req, res) => {
  const { category, year_award } = req.query;

  let theWinners = goldenGlobesData.filter((item) => item.win === true);

  if (category) {
    theWinners = theWinners.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (year_award) {
    theWinners = theWinners.filter((item) => item.year_award === +year_award);
  }

  res.status(200).json({
    data: theWinners,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
