// import moment from 'moment';
import data from '../data/ufoSightings.json';
import { filterBy, groupBy } from '../utils/filters';

export const list = (req, res) => {
  let dataToSend = data;
  // queries
  dataToSend = filterBy(dataToSend, { ...req.query })
  dataToSend = groupBy(dataToSend, req.query.groupBy)
  // srting  // orderby  
  dataToSend = groupBy(dataToSend, req.query.groupBy)
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
