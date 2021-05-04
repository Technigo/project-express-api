import { Router } from 'express';
import * as sightings from './sightings'

const router = new Router();

router.get('/sightings', sightings.read)

export default router;