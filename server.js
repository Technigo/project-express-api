import express from "express"; 
import cors from "cors"; 
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send({responseMessage: "Golden Globe stats, library at /globes"}); 
});

 app.get("/globes/:ceremony", (req, res) => {
  const ceremonyNumber = goldenGlobesData.filter((globe) => {
    return globe.ceremony === +req.params.ceremony;
  });
  if (ceremonyNumber) {
      res.status(200).json({
      success: true,
      message: "OK",
      response: {
      goldenGlobesData: ceremonyNumber
    }
  });
} else {
  res.status(404).json(`Ceremony number ${ceremonyNumber} not found`); //This part does not work 
}
 });

 // tried this one, and it does'nt work together with ceremony. Also the else does not work

/*  app.get('/globes/:release', (req, res) => {
  const release = +req.params.year_film
  const yearFilm = goldenGlobesData.filter((globe) => globe.year_film)

  if(yearFilm) {
    res.json({ yearFilm: yearFilm }) 
  } else {
    res.status(404).json(`Sorry, no release year: ${release}`)
  }
})  */

 app.get("/globes", (req, res) => {
  const { category, nominee, film } = req.query
    let globes = goldenGlobesData;
  if (film) {
      globes = globes.filter((singleGlobe) => { return singleGlobe.film.toLowerCase() === film.toLowerCase() });
  }
  if (nominee) {
      globes = globes.filter((singleGlobe) => { return singleGlobe.nominee.toLowerCase() === nominee.toLowerCase() });
  }
  if (category) {
      globes = globes.filter(singleGlobe => singleGlobe.category.toString().toLowerCase().includes(category.toLowerCase()));
  }
 res.status(200).json({
   success: true,
   message: "OK",
   response: {
   goldenGlobesData: globes
}
});
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
