import data from '../data/ufoSightings.json';
import { queried } from '../utils/filters';
import { paginate } from '../utils/pagination';
import { validateQueries } from '../utils/restrictions';

export const list = (req, res) => {
  if (!validateQueries(req.query)) {
    return res.status(403).json({
      status: 'error',
      message:
        'The queries you provided are not allowed on this endpoint. Please provdie another query'
    });
  }
  let dataToSend = data;
  dataToSend = queried(dataToSend, req.query);
  if (!dataToSend) {
    return res.status(400).json({
      status: 'error',
      message: 'The query you provided did not return any data. Please try again'
    });
  } else {
    const totalLength = dataToSend.length;
    dataToSend = paginate(dataToSend, { ...req.query });

    res.send({
      numOfGroups: dataToSend.numOfGroups,
      total: totalLength,
      limit: dataToSend.length || 0,
      page: req.query.start || 1,
      items: dataToSend
    });
  }
};

export const view = (req, res) => {
  const { id } = req.params;

  if (Object.keys(req.query).length > 0) {
    return res.status(403).json({
      status: 'error',
      message: 'Queries are not allowed for this endpoint'
    });
  }

  const item = data.find((d) => d.id === +id);
  if (!item) {
    return res.status(404).json({
      status: 'error',
      message: 'Could not find the requested sighting by ID'
    });
  }
  res.send(item);
};
