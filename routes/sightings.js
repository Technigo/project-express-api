// import moment from 'moment';
import data from '../data/ufoSightings.json';
import { filterBy, groupBy, sortBy } from '../utils/filters';

export const list = (req, res) => {
  let dataToSend = data;

  dataToSend = filterBy(dataToSend, { ...req.query });
  dataToSend = groupBy(dataToSend, req.query.groupBy);
  dataToSend = sortBy(dataToSend, { sort: req.query.sortBy, order: req.query.orderBy });

  dataToSend = dataToSend.flat();

  res.send({
    count: dataToSend.length,
    items: dataToSend
  });
};
export const view = (req, res) => {
  const { id } = req.params;
  const item = data.find((d) => d.id === +id);
  res.send(item);
};
