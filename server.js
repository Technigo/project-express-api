import express from "express";
import cors from "cors";
import router from "./routes/Routes.js";

const port = process.env.PORT || 5190;
const app = express();
app.use("/", router);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
