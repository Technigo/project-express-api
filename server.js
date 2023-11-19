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
app.use(express.static('public'));


// Endpoint: Using an HTML response:
app.get("/", (req, res) => {
  res.send(`
    <h1 style= "color: blue">Welcome to the Golden Globes API</h1>
    <p>This API provides information about Golden Globes nominations.</p>
    <p>Available endpoints:</p>
    <ul>
      <li>
      <a href="/nominations">/nominations</a> - Get all nominations</li>
      <li>
      <a href="/year/2010">/year/2010</a> - Get nominations for a specific year, example 2010</li>
      <li>
      <a href="/year/2010?won=true">/year/2010?won=true</a> - Get winning nominations for a specific year</li>
    </ul>
    </body>
    </html>
  `);
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

// app.get('/category/:category', (req,res) => {
//   const category = req.params.category;
//   const nominationsByCategory = goldenGlobesData.filter((item) => item.category)
//   res.json(nominationsByCategory)
// }
// )
// Additional error handling for invalid routes

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
