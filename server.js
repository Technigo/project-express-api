import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import members from "./data/technigo-members.json";
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

//RETURNS ALL NOMINATIONS
app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData);
});

//RETURNS NOMINATIONS A SPECIFIC YEAR. ADDITIONALLY SORTS ON WINS WITH ?WON=TRUE
app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  // console.log({ year });
  const showWon = req.query.win;
  let nominationsFromYear = goldenGlobesData.filter(
    (item) => item.year_award === +year
  );

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }
  res.json(nominationsFromYear);
});

//SEARCH FOR IF A SPECIFIC FILM EVER BEEN NOMINATED ONE OR SEVERAL TIMES
app.get("/nominations/:film", (req, res) => {
  const film = req.params.film;
  const filmNominees = goldenGlobesData.filter(
    (movie) => movie.nominee === film
  );

  if (filmNominees.length === 0) {
    res
      .status(404)
      .json(`Sorry, we can´t find any nomination for the movie ${nominee} `);
  } else {
    res.status(200).json(filmNominees);
  }
});

//TEST FROM NOTION SEARCH BOTH NOMINEE AND CATEGORY// förstår inte vad denna gör
app.get("/test", (request, response) => {
  const { nominee, category } = request.query;
  let testfilter = goldenGlobesData;

  if (nominee) {
    testfilter.filter((item) =>
      item.nominee.toLocaleLowerCase().includes(nominee.toLocaleLowerCase())
    );
  }
  if (category) {
    testfilter.filter((item) =>
      item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())
    );
  }

  if (testfilter.length === 0) {
    response.status(404).json("Sorry we couldn't find book you seek");
  } else {
    response.json(testfilter);
  }
}),
  //SEARCH ON CATEGORIES//CASE WITH BUTTONS
  app.get("/categories/:category", (req, res) => {
    const category = req.params.category;
    const categorySearch = goldenGlobesData.filter(
      (item) => item.category === category
    );

    res.status(200).json(categorySearch);
  });

//RETURNS ALL WINNERS A SPECIFIC YEAR
app.get("/winners/:year", (req, res) => {
  let theWinners = goldenGlobesData.filter((item) => item.win === true);

  const yearWon = req.params.year;
  // console.log({ yearWon });
  const theYearWinners = theWinners.filter(
    (item) => item.year_award === +yearWon
  );

  res.status(200).json(theYearWinners);
});

//RETURNS ALL WINNERS IN A SPECIFIC CATEGORY
app.get("/winners/:category", (req, res) => {
  let theWinners = goldenGlobesData.filter((item) => item.win === true);

  const categoryWon = req.params.category;
  // console.log({ yearWon });
  const categoryWinners = theWinners.filter(
    (item) => item.category === categoryWon
  );

  res.status(200).json(categoryWinners);
});

//TESTS WITH TECHNIGO_MEMBERS DATA
app.get("/members", (req, res) => {
  res.json(members);
});

app.get("/members/:role", (req, res) => {
  const memberByRole = members.find(
    (member) => member.role === req.params.role
  );

  res.status(200).json(memberByRole);
});

// app.get("/members/:role", (req, res) => {
//   const role = req.params.role;
//   const memberByRole = members.filter((item) => item.role === role);

//   res.status(200).json(memberByRole);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
