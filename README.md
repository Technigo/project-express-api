# Project Express API

The goal of this project was to create an API using Express. That has a couple of RESTful endpoints which return
either an array of data, or a single item.

## The problem

This project doesn't include databases, so I used a hard-coded set of data about NASA Astronauts stored as a JSON
file. This API only performs GET requests and is built using Express. 

## Documentation

**BASE URL**

https://express-api-technigo.herokuapp.com/

The base URL returns the list of all available endpoints.

**GET** /api/astronauts

This endpoint returns a JSON object "astronauts" containing all NASA astronauts and information about them.

**Query** /api/astronauts?name={name}&status={status}&mission={mission}&gender={gender}&major={major}&graduateMajor={graduateMajor}

* **name** - *optional* - Returns a filtered list of astronauts that includes the name of the astronaut.
* **status** - *optional* - Returns a filtered list of astronauts that includes their status (Active, Retired, Deceased..).
* **mission** - *optional* - Returns a filtered list of astronauts that includes the missions they have been on.
* **gender** - *optional* - Returns a filtered list of astronauts that includes female or male astronauts.
* **major** - *optional* - Returns a filtered list of astronauts that includes the undergraduate major they studied.
* **graduateMajor** - *optional* - Returns a filtered list of astronauts that includes the graduate major they studied.

**GET** /api/astronauts:id

This endpoint returns information about a single astronaut.

**GET** /api/year/:year

This endpoint returns a JSON object "year" containing all filtered NASA astronauts from a specific year.

**Query** /api/year/:year?gender={gender}&group={group}&spaceFlights={spaceFlights}&spaceHours={spaceHours}&spaceWalks={spaceWalks}&walksHours={walksHours}

* **gender** - *optional* - Returns a filtered list of astronauts that includes female or male astronauts.
* **group** - *optional* - Returns a filtered list of astronauts that includes the group of the astronaut.
* **spaceFlights** - *optional* - Returns a filtered list of astronauts that includes the number of space flights they have been on.
* **spaceHours** - *optional* - Returns a filtered list of astronauts that includes the number of hour during space flight they have been on.
* **spaceWalks** - *optional* - Returns a filtered list of astronauts that includes the number of space walks they have been on.
* **walksHours** - *optional* - Returns a filtered list of astronauts that includes the number of hour during space walks they have been on.

