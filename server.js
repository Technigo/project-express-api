import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Endpoint: Using an HTML response:
// Endpoint: Using an HTML response with links
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Endpoints</title>
    </head>
    <body>
      <h1>API Endpoints</h1>
      <ul>
        ${endpoints.map(endpoint => `<li><a href="${endpoint.path}">${endpoint.path}</a></li>`).join('\n')}
      </ul>
    </body>
    </html>
  `;
  res.send(html);
});



// Endpoint: (baseurl/nominations)
app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

// Endpoint: (baseurl/year/*any year*)
app.get('/year/:year', (req, res) => {
  const year = req.params.year

  // Endpoint: (baseurl/year/2010?won=true)
  const showWon = req.query.won
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  res.json(nominationsFromYear)
})

// Endpoint: (baseurl/film/:filmName)
app.get('/film/:filmName', (req, res) => {
  const filmName = req.params.filmName;
  const filmDetails = goldenGlobesData.find((item) => item.nominee.toLowerCase() === filmName.toLowerCase());

  if (filmDetails) {
    res.json(filmDetails);
  } else {
    res.status(404).json({ error: "Film not found" });
  }
});


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
