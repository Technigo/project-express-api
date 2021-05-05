import moment from 'moment';
import _ from 'lodash';
import { parseDate } from './dates';

export const filterBy = (data, query) => {
  // filter by year-like queries (only one!)
  if ('year' in query) {
    // filter by year
    data = data.filter((item) => moment(parseDate(item.date)).year() === +query.year);
  } else if ('yearRange' in query) {
    const range = query.yearRange.split('-');
    // filter by range of 2 year values
    data = data.filter((item) => moment(parseDate(item.date)).isBetween(range[0], range[1]));
  }

  // filter by countries
  if ('countries' in query) {
    const countries = query.countries.split(',');
    data = data.filter((item) => countries.includes(item.country));
  }
  
  // filter by shape
  if ('shapes' in query) {
    const shapes = query.shapes.split(',');
    data = data.filter((item) => shapes.includes(item.shape));
  }

  return data;
};

export const groupBy = (data, group) => {
  data = _.groupBy(data, group);
  return data;
}