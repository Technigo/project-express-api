import data from '../data/ufoSightings.json'

export const read = (req, res) => {
  res.send(data)
}

