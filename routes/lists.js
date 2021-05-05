import moment from 'moment';
import data from '../data/ufoSightings.json';
import { parseDate } from '../utils/dates'

export const preInternet = (req, res) => {
  const filteredData = data.filter((item) => {
    return moment(parseDate(item.date)).isBefore(moment('1983'));
  });
  res.send({
    count: filteredData.length,
    items: filteredData
  });
};

export const postInternet = (req, res) => {
  const filteredData = data.filter((item) => {
    return moment(parseDate(item.date)).isAfter(moment('1983'));
  });
  res.send({
    count: filteredData.length,
    items: filteredData
  });
};