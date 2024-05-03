import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData)
})

app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)
  if (showWon === "true") {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  } else if (showWon === "false") {
    nominationsFromYear = nominationsFromYear.filter((item) => !item.win)
  }
  res.json(nominationsFromYear)
})

app.get("/nominations/:nominee", (req, res) => {
  const nominee = req.params.nominee.toLowerCase();
  const nomineeName = goldenGlobesData.filter ((item) => item.nominee.toLowerCase() === nominee)
  res.json(nomineeName)
})

app.get("/ceremony/:ceremony", (req, res) => {
  const ceremony = req.params.ceremony
  const showWon = req.query.won
  let ceremonyYear = goldenGlobesData.filter((item) => item.ceremony === +ceremony)
  if (showWon === "true"){
    ceremonyYear = ceremonyYear.filter((item) => item.win)
  } else if (showWon === "false") {
    ceremonyYear = ceremonyYear.filter ((item) => !item.win)
  }
  res.json(ceremonyYear)
})

app.get("/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const { won, year } = req.query

  let categoryName = goldenGlobesData.filter((item) =>
    item.category.toLowerCase().includes(category)
  )

  categoryName = year ? categoryName.filter((item) => item.year_award === +year) : categoryName

  categoryName = won ? 
    (won === "true" ? categoryName = categoryName.filter((item) => item.win) : won === "false" ? categoryName = categoryName.filter ((item) => !item.win) : categoryName) 
  : categoryName

  res.json(categoryName)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});