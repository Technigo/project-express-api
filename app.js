import express from "express";
import cors from "cors";

import astronautsApi from "./astronauts/index"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/astronauts", astronautsApi.getAllAstronauts);
app.get("/api/astronauts/:id", astronautsApi.getAstronautById);

app.get("/api/year/:year", astronautsApi.getAstronautByYear);

export default app;