const allowedQueries = [
  'year',
  'yearRange',
  'countries',
  'shapes',
  'groupBy',
  'sortBy',
  'orderBy',
  'limit',
  'start'
];

export const validateQueries = (query) => {
  const queryIsAllowed = Object.keys(query).map((key) => {
    return allowedQueries.includes(key);
  });
  return !queryIsAllowed.includes(false) || queryIsAllowed.length === 0;
};
