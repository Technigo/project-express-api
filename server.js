/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());
// Add router module
app.use('/', router);
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
