import express from 'express';
import cors from 'cors';
import nominations from './data/golden-globes.json';

const port = process.env.PORT || 8080
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Golden globe');
});

app.get('/nominations', (req, res) => {

  const { category } = req.params;
  const allNominations = nominations;

  if (category) {
    allNominations = allNominations.filter(
      (category) => nominations.category.toLowerCase() === category.toLowerCase()
    );
  };

  res.status(200).json({
    data: allNominations,
    success: true,

  });
});

app.get('/years/film/:film', (req, res) => {

  const { film } = req.params;

  const filmYear = years.find((year) => year.film.toLowerCase() === film).toLowerCase();

  if (!filmYear) {
    res.status(404).json({
      data: 'Not found',
      success: false,

    });
  } else {
    res.status(200).json({
      data: filmYear,
      success: true,
    });
  }
});

app.get('/nominations/categoy/:category', (req, res) => {
  const { category } = req.params;

  const filmCategory = nominations.filter((nomination) => nomination.category.toLowerCase() === category.toLowerCase());
  if (!filmCategory) {
      res.status(404).json({
        data: 'Not found',
        success: false,
  
      });

    } else {
      res.status(200).json({
        data: filmCategory,
        success: true,
      });
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
