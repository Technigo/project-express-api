import listEndpoints from "express-list-endpoints";

import app from "../app";
import nasaAstronauts from "../data/nasa-astronauts.json";

const listEndPoints = (req, res) => {
  res.send(listEndpoints(app))
};

const getAllAstronauts = (req, res) => {
  const { name, status } = req.query;
  let filteredAstronauts = nasaAstronauts;

  if (name) {
    filteredAstronauts = filteredAstronauts
      .filter((item) => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
  };

  if (status) {
    filteredAstronauts = filteredAstronauts
      .filter((item) => item.status.toLocaleLowerCase().includes(status.toLocaleLowerCase()));
  };

  if (filteredAstronauts.length === 0) {
    res.status(404)
      .json({
        success: false,
        status_code: 404,
        status_message: "Sorry we couldn't find the astronaut you are looking for."
      })
  } else {
    res.status(200).json({
      success: true,
      astronauts: filteredAstronauts
    })
  }
};

const getAstronautById = (req, res) => {
  const { id } = req.params;
  const specificAstronaut = nasaAstronauts.find((item) => item.id === +id);

  if (!specificAstronaut) {
    res.status(404).json({
      success: false,
      status_code: 404,
      status_message: "Astronaut not found"
    })
  } else {
    res.status(200).json({
      success: true,
      astronaut: specificAstronaut
    })
  }
};

const getAstronautByYear = (req, res) => {
  const { year } = req.params;
  const { gender, group } = req.query;

  let astronautsFromYear = nasaAstronauts.filter((item) => item.year === +year)

  if (gender) {
    astronautsFromYear = astronautsFromYear
      .filter((item) => item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase());
  };

  if (group) {
    astronautsFromYear = astronautsFromYear
      .filter((item) => item.group === +group);
  };

  if (astronautsFromYear.length === 0) {
    res.status(404).json({
      success: false,
      status_code: 404,
      status_message: `Astronauts from ${year} not found`
    })
  } else {
    res.status(200).json({
      success: true,
      astronaut: astronautsFromYear
    })
  }
};

module.exports = {
  listEndPoints,
  getAllAstronauts,
  getAstronautById,
  getAstronautByYear
};