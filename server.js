import express from "express"; 
import cors from "cors"; 
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.status(200).json({
    responseMessage: "Golden Globe statistics",
    endPointsArray: "/globes - returns an array of all movies",
    endPointsArrayQuery: "/globes ? category, nominee, film",
    endPointsSingleItem: "/globes/ceremony/:ceremony - /globes/release/:release"
  }); 
});

 app.get("/globes/ceremony/:ceremony", (req, res) => {
  const ceremonyNumber = goldenGlobesData.filter((globe) => {
    return globe.ceremony === +req.params.ceremony;
  });
  if (ceremonyNumber) {
      res.status(200).json({
      success: true,
      message: "OK",
      response: {
      ceremonyNumber: ceremonyNumber
    }
  });
} else {
  res.status(404).json({
    success: false,
    message: "Ceremony not found",
    response: (`Ceremony number ${params.ceremony} not found`)
  }) 
}
 });

app.get('/globes/release/:release', (req, res) => {
  const release = +req.params.year_film
  const yearFilm = goldenGlobesData.filter((globe) => globe.year_film)

  if(yearFilm) {
    res.status(200).json({ 
      success: true,
      message: "OK",
      response: {
      yearFilm: yearFilm } 
    }); 
  } else {
    res.status(404).json({
      success: false,
      message: "Ceremony not found",
      response: (`Sorry, no release year: ${release}`) // else does not work, if year 2020, it returns all movies
    })
  }
}) 

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
