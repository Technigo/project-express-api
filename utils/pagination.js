import _ from 'lodash';

export const paginate = (data, { limit, start, groupBy }) => {
  if (data.length <= limit) {
    limit = data.length;
    start = 1;
  }

  if (groupBy) {
    return { ...data, numOfGroups: _.size(data) };
  }

  data = _.chunk(data, limit || 25);
  return start ? data[start - 1] : data[0];
};
