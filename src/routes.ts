import * as express from 'express';
import CovidController from './controller/CovidController';

const app = express.Router();

app.get('/', CovidController.index);

export default app
