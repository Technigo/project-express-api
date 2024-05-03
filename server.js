import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";
import listEndpoints from "express-list-endpoints";
import docu from "./docu.json";

const fs = require("fs");
const port = process.env.PORT || 5190;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start with showing the updated documentation for the api
app.get("/", (req, res) => {
  res.send(docu);
});



//  make filter with query params
app.get("/movies/filter", (req, res) => {
  const { category, year, win, nominee, film } = req.query;
  let filteredMovies = goldenGlobesData;

  if (category) {
    filteredMovies = filteredMovies.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (year) {
    filteredMovies = filteredMovies.filter((item) => item.year_award === +year);
  }
  if (win) {
    filteredMovies = filteredMovies.filter((item) => item.win === true);
  }
  if (nominee) {
    filteredMovies = filteredMovies.filter((item) => item.nominee.toLowerCase().includes(nominee.toLowerCase()));

  }
  if (film) {

    filteredMovies = filteredMovies.filter((item) => item.film.toLowerCase().includes(film.toLowerCase()));

  }
  if (filteredMovies.length === 0) {
    res.status(404).send(`No movies found`);
  }
  res.json(filteredMovies);
});


// get golden globes data
app.get("/movies", (req, res) => {
  res.json(goldenGlobesData);
});

// get a movies who won
app.get("/movies/:win", (req, res) => {
  let WinningMovies = goldenGlobesData.filter((item) => item.win === true);
  if (WinningMovies.length === 0) {
    res.status(404).send(`No movies found`);
  }
  res.json(WinningMovies);
});

//get movies from a certain year

app.get("/movies/year/:year", (req, res) => {
  const year = req.params.year;
  const moviesFromYear = goldenGlobesData.filter((item) => item.year_award === +year);
  if (moviesFromYear.length === 0) {
    res.status(404).send(`No movies found from year ${year}`);
  } else {
    res.json(moviesFromYear);
  }
});


// get movies from a certain category

app.get("/movies/category/:category", (req, res) => {
  const category = req.params.category;
  const moviesFromCategory = goldenGlobesData.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()));
  if (moviesFromCategory.length === 0) {
    res.status(404).send(`No movies found in this category`);
  } else {
    res.json(moviesFromCategory);
  }
});

// get the movie from a certain  year and category
app.get("/movies/year/:year/category/:category", (req, res) => {
  const category = req.params.category;
  const year = req.params.year;
  const moviesFromCategoryAndYear = goldenGlobesData.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()) && item.year_award === +year);
  if (moviesFromCategoryAndYear.length === 0) {
    res.status(404).send(`No movies found in this category and year`);
  }
  res.json(moviesFromCategoryAndYear);
}
);

// return all winning movies from a certain year, if win=true

app.get("/movies/year/:year/:win", (req, res) => {
  const year = req.params.year;
  let WinningMoviesFromYear = goldenGlobesData.filter((item) => item.win === true && item.year_award === +year);
  if (WinningMoviesFromYear.length === 0) {
    res.status(404).send(`No movies found in this category and year`);
  }
  res.json(WinningMoviesFromYear);
}
);


// return all winning movies from a certain year, category and win=true

app.get("/movies/year/:year/category/:category/:win", (req, res) => {
  const year = req.params.year;
  const category = req.params.category;
  let WinningMoviesFromYearAndCategory = goldenGlobesData.filter((item) => item.win === true && item.year_award === +year && item.category.toLowerCase().includes(category.toLowerCase()));
  if (WinningMoviesFromYearAndCategory.length === 0) {
    res.status(404).send(`No movies found in this category and year`);
  }
  res.json(WinningMoviesFromYearAndCategory);
}
);

// return all winning movies from a certain category, nominee and win=true
app.get("/movies/nominee/:nominee/category/:category", (req, res) => {
  const category = req.params.category;
  const nominee = req.params.nominee;
  let ActorInCategory = goldenGlobesData.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()) && item.nominee.toLowerCase().includes(nominee.toLowerCase()));
  if (ActorInCategory.length === 0) {
    res.status(404).send(`No movies found for this nominee in this category`);
  }
  res.json(ActorInCategory);
}
);



// return all winning movies from a certain category, nominee and win=true
app.get("/movies/nominee/:nominee/category/:category/:win", (req, res) => {
  const category = req.params.category;
  const nominee = req.params.nominee;
  let WinningActorInCategory = goldenGlobesData.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()) && item.nominee.toLowerCase().includes(nominee.toLowerCase()) && item.win === true);
  if (WinningActorInCategory.length === 0) {
    res.status(404).send(`No winning movies found for this nominee in this category`);
  }
  res.json(WinningActorInCategory);
}
);

// return all movies from a nominee
app.get("/movies/nominee/:nominee", (req, res) => {
  const nominee = req.params.nominee;
  const moviesFromNominee = goldenGlobesData.filter((item) => item.nominee.toLowerCase().includes(nominee.toLowerCase()));
  if (moviesFromNominee.length === 0) {
    res.status(404).send(`No movies found`);
  } else {
    res.json(moviesFromNominee);
  }
}
);

// return all wins for a certain nominee
app.get("/movies/nominee/:nominee/:win", (req, res) => {
  const nominee = req.params.nominee;
  let WinningNominee = goldenGlobesData.filter((item) => item.win === true && item.nominee.toLowerCase().includes(nominee.toLowerCase()));
  if (WinningNominee.length === 0) {
    res.status(404).send(`No movies found`);
  } else {
    res.json(WinningNominee);
  }
}
);

// return all nominations for a certain film or series
app.get("/movies/film/:film", (req, res) => {
  const film = req.params.film;
  const filmsNomination = goldenGlobesData.filter((item) => item.film.toLowerCase().includes(film.toLowerCase()));
  if (filmsNomination.length === 0) {
    res.status(404).send(`No movies found`);
  } else {
    res.json(filmsNomination);
  }
}
);

//return all winning nominations for a certain film or series
app.get("/movies/film/:film/:win", (req, res) => {
  const film = req.params.film;
  const filmsNominationWin = goldenGlobesData.filter((item) => item.film.toLowerCase().includes(film.toLowerCase()) && item.win === true);
  if (filmsNominationWin.length === 0) {
    res.status(404).send(`No movies found`);
  } else {
    res.json(filmsNominationWin);
  }
}
);



// Get the list of endpoints
const endpoints = listEndpoints(app);

// Convert the endpoints to a JSON string
const jsonEndpoints = JSON.stringify(endpoints, null, 2);

// New content
const updatedContent = JSON.stringify(endpoints, null, 2);

// Read the current content of the file
fs.readFile('docu.json', 'utf8', (err, currentContent) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Compare the current content with the new content
  if (currentContent !== updatedContent) {
    // If the content is different, update the file
    fs.writeFile('docu.json', updatedContent, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Successfully wrote new content to docu.json');
      }
    });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

