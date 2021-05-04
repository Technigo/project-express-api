import moment from 'moment';
import data from '../data/ufoSightings.json';

export const preInternet = (req, res) => {
  const filteredData = data.filter((item) => {
    const date = item.date.split(' ')[0];
    return moment(new Date(date)).isBefore(moment('1983'));
  });
  res.send({
    count: filteredData.length,
    items: filteredData
  });
};

export const postInternet = (req, res) => {
  const filteredData = data.filter((item) => {
    const date = item.date.split(' ')[0];
    return moment(new Date(date)).isAfter(moment('1983'));
  });
  res.send({
    count: filteredData.length,
    items: filteredData
  });
};