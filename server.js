import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";
// import { json } from "express/lib/response";


// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";



const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());

const data = goldenGlobesData


app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/nominations', (req, res) => {
  res.status(200).json(data);
});


app.get('/')


app.get('/year/:year', (req, res) => {
  const year = req.params.year
  // const showWon = req.query.won
  let nominationsFromYear = goldenGlobesData.find(
    (item) => item.year_award === +year
  );
  
  // if (showWon) {
  //   nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  // }

  res.status(200).json(nominationsFromYear);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
