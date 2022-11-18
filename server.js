import express from "express"; 
import cors from "cors"; 
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send({responseMessage: "Golden Globe stats, library at /golbes"}); 
});

/* app.get("/globes", (req, res) => {
  res.status(200).json({goldenGlobesData: goldenGlobesData});
}); */

app.get("/globes", (req, res) => {
  res.send(goldenGlobesData)
 });

app.get("/globes/:year_film", (req, res) => {
  const singleGlobe = goldenGlobesData.filter((globe) => {
    return globe.year_film === +req.params.year_film;
  });
  res.status(200).json(singleGlobe);
 });

 app.get("/globes", (req, res) => {
  const { category, nominee, film } = req.query
    let globes = goldenGlobesData;
  if (category) {
      globes = goldenGlobesData.filter(singleCategory => singleCategory.category.toLowerCase() === category.toLowerCase());
  }
  if (nominee) {
    globes = goldenGlobesData.filter(singleNominee => singleNominee.nominee.toLowerCase() === nominee.toLowerCase());
  }
 res.status(200).json({goldenGlobesData: globes})
});

// gör en för actors / film tv?

/*  app.get("/sales/:date", (req, res) => {
  const allDates = avocadoSales.filter((sale) => {
    return sale.date === +req.query.date;
  });
  res.status(200).json(allDates);
 }); */




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
