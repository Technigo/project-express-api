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


// Start route on default port
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//the style-sheet is linked in its own route, and sent as the response using sendFile
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});


// ROUTE 1 - collection of results (array of elements)
app.get("/nominations", (req, res) => {
  res.status(200).json(goldenGlobesData); 
});

// ROUTE 2 Two filters - see won movies in a specific year
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const showWin = req.query.win
  let nominationsFromYear = goldenGlobesData.filter ((item) => item.year_award === +year)
  
  if (showWin) {
    nominationsFromYear = nominationsFromYear.filter ((item) => item.win)
  }
    res.json(nominationsFromYear)
})

// ROUTE 3 - collection of results (array of elements) using filter
app.get("/year/:year", (req, res) => {
  const year = +req.params.year;
  const yearAward = goldenGlobesData.filter((item)=>item.year_award === year)
    
  if (yearAward ===!year) {
    res.status(404).send("no nominations that year!");
  } else 
    res.json(yearAward)
   })

  // response.status(200).json(yearAward)
  // })

  //ROUTE 4 - a single result (single element) using find
  app.get("/nominations/:film", (req, res) => {
      const singleFilm = goldenGlobesData.find((movie) => {
        return movie.film.toLowerCase() === req.params.film.toLowerCase();
      }); 
       res.status(200).json(singleFilm);
    });


// Start the server 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
