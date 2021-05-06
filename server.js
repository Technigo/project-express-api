import express from 'express';
import cors from 'cors';
import router from './routes';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
// Add router module
app.use('/', router);

// Start the server
app.listen(port, () => {});
