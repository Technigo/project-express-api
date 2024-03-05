// server.js

import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import exercisesData from "./data/exercises.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json(listEndpoints(app));
});

// Updated Route to return all exercises with optional filtering and pagination
app.get("/exercises", (req, res) => {
    let { page, limit, level } = req.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : exercisesData.exercises.length;
    let exercises = exercisesData.exercises;

    if (level) {
        exercises = exercises.filter(e => e.level === level);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedExercises = exercises.slice(startIndex, endIndex);

    res.json(paginatedExercises);
});

app.get("/exercises/:name", (req, res) => {
    const { name } = req.params;
    const exercise = exercisesData.exercises.find(e => e.name.toLowerCase() === name.toLowerCase());
    if (!exercise) {
        return res.status(404).send({ error: "Exercise not found" });
    }
    res.json(exercise);
});

app.get("/exercises/target/:muscle", (req, res) => {
    const { muscle } = req.params;
    const targetedExercises = exercisesData.exercises.filter(exercise => 
        exercise.primaryMuscles.includes(muscle.toLowerCase()) || 
        exercise.secondaryMuscles.includes(muscle.toLowerCase())
    ).map(exercise => exercise.name);

    if (targetedExercises.length === 0) {
        return res.status(404).send({ error: "No exercises found for the specified muscle" });
    }

    res.json(targetedExercises);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
