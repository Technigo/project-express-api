import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";

import whoData from "./data/doctorwho.json";

const port = process.env.PORT || 8080;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//endpoints

//route handler
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

//1️⃣ endpoint that returns all episodes
//example: http://localhost:8080/episodes
app.get("/episodes", (req, res) => {
  res.json(whoData);
});

//2️⃣ endpoint to return a single result defined by id
//example: http://localhost:8080/episodes/15
app.get("/episodes/:episodeId", (req, res) => {
  const { episodeId } = req.params;
  const episode = whoData.find((episode) => +episodeId === episode.id); //+ turns string into number

  if (episode) {
    res.json(episode);
  } else {
    res.status(404).send(`There is no episode with id ${episodeId}!`);
  }
});

//3️⃣ endpoint to return a single result defined by "air date"
//example: http://localhost:8080/episodes/airdate/2010-04-03
app.get("/episodes/airdate/:date", (req, res) => {
  const { date } = req.params;
  const episode = whoData.find((episode) => episode.air_date === date);

  if (episode) {
    res.json(episode);
  } else {
    res
      .status(404)
      .json({ message: `There is no episode with ${date} air date!` });
  }
});

//4️⃣ endpoint to return episodes filtered by actor name
//example: http://localhost:8080/episodes/actor/Matt%20Smith
app.get("/episodes/actor/:actorName", (req, res) => {
  const { actorName } = req.params;

  const filteredEpisodes = whoData.filter(
    (episode) =>
      episode.doctor_actor.toLowerCase().trim() ===
      actorName.toLowerCase().trim() //remove whitespace from doctor name
  );

  if (filteredEpisodes.length > 0) {
    res.json(filteredEpisodes);
  } else {
    res.status(404).json({ message: `No episode found for ${actorName}` });
  }
});

//5️⃣ endpoint to get a list of all doctor names
//example: http://localhost:8080/doctors
app.get("/doctors", (req, res) => {
  const doctorNames = whoData
    .map((episode) => episode.doctor_actor)
    .filter((actor, index, self) => self.indexOf(actor) === index); //filter out duplicates

  res.json(doctorNames);
});

//6️⃣ endpoint to get a list of all companion names
//example: http://localhost:8080/companions
app.get("/companions", (req, res) => {
  const companionNames = whoData
    .map((episode) => episode.companion)
    .filter((companion, index, self) => self.indexOf(companion) === index); //filter out duplicates

  res.json(companionNames);
});

//7️⃣ endpoint to get a list of episodes per year based on air_date
//example: http://localhost:8080/episodes/year/2010
app.get("/episodes/year/:year", (req, res) => {
  const { year } = req.params;

  const filteredEpisodes = whoData.filter((episode) => {
    const episodePerYear = episode.air_date.split("-")[0]; //extract year from air_date
    return episodePerYear === year;
  });

  if (filteredEpisodes.length > 0) {
    res.json(filteredEpisodes);
  } else {
    res.status(404).json({ message: `no episode found for year ${year}` });
  }
});

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
