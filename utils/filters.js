import moment from 'moment';
import _ from 'lodash';
import { parseDate } from './dates';

const filter = (data, query) => {
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

const group = (data, { groupBy }) => {
  if (!groupBy) {
    return data;
  }
  data = _.groupBy(data, groupBy);
  return data;
};

const sort = (data, { sortBy, orderBy }) => {
  data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  if (orderBy === 'asc') {
    data.reverse();
  }
  return data;
};

export const queried = (data, query) => {
  data = filter(data, { ...query });
  data = sort(data, { ...query });
  data = group(data, { ...query });

  if (data.length <= 0 || !data) {
    return null;
  } else {
    return data;
  }
};
