import express from 'express';
import awards from '../data/golden-globes.json';

const router = express.Router();

router.get('/', (req, res) => {
  const { year, category, winner } = req.query;
  let filteredAwards = awards;

  if (year) {
    filteredAwards = filteredAwards.filter((award) => award.year_award == year);
  }
  if (category) {
    filteredAwards = filteredAwards.filter((award) =>
      award.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  if (winner) {
    filteredAwards = filteredAwards.filter(
      (award) => award.win.toString() === winner
    );
  }

  res.json(filteredAwards);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < awards.length) {
    res.json(awards[id]);
  } else {
    res.status(404).json({ error: 'Award not found' });
  }
});

router.post('/dummy-endpoint', (req, res) => {
  res.status(501).json({ message: 'This endpoint is under construction.' });
});

export default router;
