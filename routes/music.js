import express from 'express'
const router = express.Router()

import helpers from '../helpers/music'

router.route('/')
  .get(helpers.getSongsList)

router.route('/:songId')
  .get(helpers.getSongDetails)

export default router