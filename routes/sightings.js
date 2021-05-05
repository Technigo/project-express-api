import data from '../data/ufoSightings.json';
import { queried } from '../utils/filters';
import { paginate } from '../utils/pagination';

export const list = (req, res) => {
  let dataToSend = data;
  dataToSend = queried(dataToSend, req.query);

  const totalLength = dataToSend.length;
  dataToSend = paginate(dataToSend, { ...req.query });
  res.send({
    numOfGroups: dataToSend.numOfGroups,
    total: totalLength,
    limit: dataToSend.length || 0,
    items: dataToSend
  });
};

export const view = (req, res) => {
  const { id } = req.params;
  const item = data.find((d) => d.id === +id);

  if (item === undefined) {
    return res.status(404).json({
      status: 'error',
      message: 'Could not find the requested sighting by ID'
    });
  }

  res.send(item);
};
