import listEndpoints from "express-list-endpoints";

import app from "../app";
import nasaAstronauts from "../data/nasa-astronauts.json";
import missions from "../data/missions.json";

const pagination = (data, pageNumber=1, response) => {
  const pageSize = 52;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const astronautsOnPage = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  if (pageNumber < 1 || pageNumber > totalPages && data.length > 0) {
    response.status(422)
      .json({
        success: false,
        status_code: 422,
        status_message: `Page must be less than or equal to ${totalPages}`
      });
  } else {
    const returnObject = {
      page: pageNumber,
      page_size: astronautsOnPage.length,
      success: true,
      results: astronautsOnPage,
      total_pages: totalPages,
      total_results: data.length
    };

    return returnObject;
  };
};

const formatString = (string) => {
  return string
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z ]/g, "")
    .toLowerCase()
};

const listEndPoints = (req, res) => {
  res.json(listEndpoints(app))
};

const getAllAstronauts = (req, res) => {
  const { status, mission, gender, major, graduateMajor, page } = req.query;
  let filteredAstronauts = nasaAstronauts;

  if (status) {
    filteredAstronauts = filteredAstronauts
      .filter((astronaut) => formatString(astronaut.status).includes(formatString(status)));
  };

  if (mission) {
    filteredAstronauts = filteredAstronauts
      .filter((astronaut) => astronaut.missions.toLowerCase().includes(mission.toLowerCase()));
  };

  if (gender) {
    filteredAstronauts = filteredAstronauts
      .filter((astronaut) => formatString(astronaut.gender) === formatString(gender));
  };

  if (major) {
    filteredAstronauts = filteredAstronauts
      .filter((astronaut) => formatString(astronaut.underGraduateMajor) === formatString(major));
  };

  if (graduateMajor) {
    filteredAstronauts = filteredAstronauts
      .filter((astronaut) => formatString(astronaut.graduateMajor) === formatString(graduateMajor));
  };

  res.status(200).json(pagination(filteredAstronauts, page, res))
};

const getAstronautByName = (req, res) => {
  const { name } = req.params;
  const specificAstronaut = nasaAstronauts.find((astronaut) => formatString(astronaut.name) === formatString(name));

  if (!specificAstronaut) {
    res.status(404).json({
      success: false,
      status_code: 404,
      status_message: `Astronaut with the name of ${name} can't be found`
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
  const { gender, group, spaceFlights, spaceHours, spaceWalks, walksHours, page } = req.query;

  let astronautsFromYear = nasaAstronauts.filter((astronaut) => astronaut.year === +year)

  if (gender) {
    astronautsFromYear = astronautsFromYear
      .filter((astronaut) => formatString(astronaut.gender) === formatString(gender));
  };

  if (group) {
    astronautsFromYear = astronautsFromYear
      .filter((astronaut) => astronaut.group === +group);
  };

  if (spaceFlights) {
    astronautsFromYear = astronautsFromYear
      .filter((astronaut) => astronaut.spaceFlights === +spaceFlights);
  };

  if (spaceHours) {
    astronautsFromYear = astronautsFromYear
      .filter((astronaut) => astronaut.spaceFlight_hr === +spaceHours);
  };

  if (spaceWalks) {
    astronautsFromYear = astronautsFromYear
      .filter((astronaut) => astronaut.spaceWalks === +spaceWalks);
  };

  if (walksHours) {
    astronautsFromYear = astronautsFromYear
      .filter((astronaut) => astronaut.spaceWalks_hr === +walksHours);
  };

  res.status(200).json(pagination(astronautsFromYear, page, res))
};

const getAllMissions = (req, res) => {
  const { shuttle, crew, launch_pad, landing_site, page } = req.query;
  let filteredMissions = missions;

  if (shuttle) {
    filteredMissions = filteredMissions
      .filter((mission) => formatString(mission.shuttle).includes(formatString(shuttle)));
  };

  if (crew) {
    filteredMissions = filteredMissions
      .filter((mission) => mission.crew === +crew);
  };

  if (launch_pad) {
    filteredMissions = filteredMissions
      .filter((mission) => mission.launch_pad.toUpperCase().includes(launch_pad.toUpperCase()));
  };

  if (landing_site) {
    filteredMissions = filteredMissions
      .filter((mission) => formatString(mission.landing_site).includes(formatString(landing_site)));
  };

  res.status(200).json(pagination(filteredMissions, page, res))
};

const getOneMission = (req, res) => {
  const { name } = req.params;
  const specificMission = missions.find((oneMission) => oneMission.mission.toUpperCase() === name.toUpperCase());

  if (!specificMission) {
    res.status(404).json({
      success: false,
      status_code: 404,
      status_message: `Mission ${name} can't be found`
    })
  } else {
    res.status(200).json({
      page: 1,
      page_size: 1,
      success: true,
      astronaut: specificMission,
      total_pages: 1,
      total_results: 1
    })
  }
};

module.exports = {
  listEndPoints,
  getAllAstronauts,
  getAstronautByName,
  getAstronautByYear,
  getAllMissions,
  getOneMission
};