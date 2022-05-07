import express from "express";
import cors from "cors";

import astronautsApi from "./astronauts/index";

const app = express();

app.use(cors());
app.use(express.json());

app.set('json spaces', 2);

app.get("/", astronautsApi.listEndPoints);

app.get("/api/astronauts", astronautsApi.getAllAstronauts);
app.get("/api/astronauts/:name", astronautsApi.getAstronautByName);

app.get("/api/year/:year", astronautsApi.getAstronautByYear);

app.get('*', (req, res) => res.status(404).send("Not Found"));

export default app;