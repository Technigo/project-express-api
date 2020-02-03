import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import Routes from './routes';

const app = express();

// Load middleware for application
app.use(compression());
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Load API routes
app.use('/api', Routes);

module.exports = app;
