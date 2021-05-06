import moment from 'moment';
import _ from 'lodash';
import data from '../data/ufoSightings.json';
import { parseDate } from '../utils/dates';
import { paginate } from '../utils/pagination';

export const preInternet = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(403).json({
      status: 'error',
      message: 'Queries are not allowed for this endpoint'
    });
  }
  let filteredData = data.filter((item) => {
    return moment(parseDate(item.date)).isBefore(moment('1983'));
  });
  const totalLength = filteredData.length;
  filteredData = paginate(filteredData, { ...req.query });

  res.send({
    total: totalLength,
    limit: filteredData.length || 0,
    page: req.query.start || 1,
    items: filteredData
  });
};

export const postInternet = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(403).json({
      status: 'error',
      message: 'Queries are not allowed for this endpoint'
    });
  }
  let filteredData = data.filter((item) => {
    return moment(parseDate(item.date)).isAfter(moment('1983'));
  });
  const totalLength = filteredData.length;
  filteredData = paginate(filteredData, { ...req.query });
  res.send({
    total: totalLength,
    limit: filteredData.length || 0,
    page: req.query.start || 1,
    items: filteredData
  });
};

export const shapes = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(403).json({
      status: 'error',
      message: 'Queries are not allowed for this endpoint'
    });
  }
  let dataToSend = _.uniq(
    data.map((item) => {
      return item.shape;
    })
  );
  const totalLength = dataToSend.length;
  dataToSend = paginate(dataToSend, { ...req.query });
  res.send({
    total: totalLength,
    limit: dataToSend.length || 0,
    page: req.query.start || 1,
    items: dataToSend
  });
};
