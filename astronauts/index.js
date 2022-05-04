import listEndpoints from "express-list-endpoints";

import app from "../app";
import nasaAstronauts from "../data/nasa-astronauts.json";

const pagination = (data, pageNumber=1, response) => {
  const pageSize = 50;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const itemsOnPage = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  if (pageNumber < 1 || pageNumber > totalPages && data.length > 0 ) {
    response.status(422)
      .json({
        success: false,
        status_code: 422,
        status_message: `Page must be less than or equal to ${totalPages}`
      });
  } else {
    const returnObject = {
      page: pageNumber,
      page_size: itemsOnPage.length,
      success: true,
      results: itemsOnPage,
      total_pages: totalPages,
      total_results: data.length
    };

    return returnObject;
  };
}

const listEndPoints = (req, res) => {
  res.send(listEndpoints(app))
};

const getAllAstronauts = (req, res) => {
  const { name, status, page } = req.query;
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
    res.status(200).json(pagination(filteredAstronauts, page, res))
  }
};

const getAstronautById = (req, res) => {
  const { id } = req.params;
  const specificAstronaut = nasaAstronauts.find((item) => item.id === +id);

  if (!specificAstronaut) {
    res.status(404).json({
      success: false,
      status_code: 404,
      status_message: `Astronaut with the id of ${id} can't be found`
    })
  } else {
    res.status(200).json({
      page: 1,
      page_size: 1,
      success: true,
      astronaut: specificAstronaut,
      total_pages: 1,
      total_results: 1
    })
  }
};

const getAstronautByYear = (req, res) => {
  const { year } = req.params;
  const { gender, group, page } = req.query;

  let astronautsFromYear = nasaAstronauts.filter((item) => item.year === +year)

  if (gender) {
    astronautsFromYear = astronautsFromYear
      .filter((item) => item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase());
  };

  if (group) {
    astronautsFromYear = astronautsFromYear
      .filter((item) => item.group === +group);
  };

  res.status(200).json(pagination(astronautsFromYear, page, res))
};

module.exports = {
  listEndPoints,
  getAllAstronauts,
  getAstronautById,
  getAstronautByYear
};