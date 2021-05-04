import data from '../data/ufoSightings.json';

export const list = (req, res) => {
  // queries
  // srting
  // orderby
  // groupby
  res.send({
    count: data.length,
    items: data
  });
};
export const view = (req, res) => {
  const { id } = req.params;
  const item = data.find((d) => d.id === +id)
  res.send(item);
};
