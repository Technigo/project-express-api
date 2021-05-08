import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const netflix = require('./Backend/Router/netflix.js'); // gets the route file

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// specifices what route to use
app.use('/', netflix);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
