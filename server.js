import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get("/", (request, response) => {
  const dataLength = String(goldenGlobesData.length);
  response.send(
    `You can find ${dataLength} movies from Golden Globes ceremony here!`
  );
});

app.get("/golden-globes/ceremonies", (request, response) => {
  const ceremoniesDuplicated = goldenGlobesData.map((movie) => movie.ceremony);

  const ceremoniesUnique = [];
  ceremoniesDuplicated.forEach((item) => {
    if (!ceremoniesUnique.includes(item)) {
      ceremoniesUnique.push(item);
    }
  });

  res.json({ data: ceremoniesUnique });
});

app.get("/golden-globes", (request, response) => {
  const { ceremony, win, category } = request.query;
  let result = goldenGlobesData;

  if (ceremony) {
    result = goldenGlobesData.filter(
      (movie) => movie.ceremony === Number(ceremony)
    );
  }

  if (win) {
    result = result.filter((movie) => movie.win);
  }

  if (category) {
    result = result.filter((movie) => movie.category.includes(category));
  }
  response.json(result);
});

app.get("/golden-globes/:film", (request, response) => {
  const { film } = request.params;
  const filteredFilm = goldenGlobesData.filter((movie) => {
    const currentFilm = movie.film.toString().toLowerCase();
    return currentFilm.includes(film.toLowerCase());
  });

  if (filteredFilm.length > 0) {
    response.json(filteredFilm);
  } else {
    response
      .status(404)
      .json({ message: `There is not information about ${film}` });
  }
});

app.listen(port, () => {
  console.log("Hello console the serer is now running");
});
