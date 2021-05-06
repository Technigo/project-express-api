import { Router } from 'express';
import * as sightings from './sightings';
import * as lists from './lists';

const router = new Router();

router.get('/sightings', sightings.list);
router.get('/sightings/:id', sightings.view);

router.get('/lists/preInternet', lists.preInternet);
router.get('/lists/postInternet', lists.postInternet);
router.get('/lists/shapes', lists.shapes);

export default router;
