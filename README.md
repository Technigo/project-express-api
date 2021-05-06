# Express API

**Mission:** 

*Create a RESTful API using Express*

**Requirements:**
- 🔵 COMPLETE (all)
- 🔴 Partial
- ⚫ Partial


***

## Installation

Navigate to the project folder and run the following command

```
$ npm install
```

**To start the server**

```
$ npm run start
```
**To start development**

```
$ npm run dev
```
<br>

## ✅ Features ✅
***
*The following are the main features of this application:*
  
  * Main path of api: 
  * The API has the following endpoints:
    * `/sightings`
      * resp => a list of sightings based on queries
      * This endpoint has the following queries available:
        * `year` - eg. `1997`. returns data from a single year. This query cannot be used if `yearRange` is used.
        * `yearRange` - eg. `1997-2011`. returns data between two specific years. This query cannot be used if `year` is used.
        * `countries` - eg. `us,gb,fr`. Can be single value or multiple values seperated by commas. Only accepts IBAN Alpha-2 country codes.
        * `shapes` - eg. `circle,triangle`. Can be single value or multiple values seperated by commas. To get full list of available shapes in db use `/lists/shapes` endpoint
        * `groupBy` - eg. `shapes`. Available groupings: shapes, countries, duration_seconds. NOTE: when grouping pagination is turned off.
        * `sortBy` - eg. `countries`. Sorts the items based on the param. See `sighting` schema for available params.
        * `orderBy` - eg. `asc`. Default: `desc` Switches the sorting order.
        * `limit` - eg. `10` Default: `25`. affects pagination. Determines how many items is recieved
        * `start` - eg. `2` Default: `1`. affects pagination. Determines what page is to be recieved
      * error => 403 if user provided a query that is not available
      * error => 400 if the queries did not match any data
    * `/sightings/:id`
      * resp => a single sighting object
      * no pagination
      * error => 403 if user tries to add queries
      * error => 404 if ID provided does not exist
    * `/lists/preInternet`
      * resp => a list of sightings before 1983
      * pagination => the list is paginated using default values
      * error => 403 if user tries to add queries
    * `/lists/postInternet`
      * resp => a list of sightings after 1983
      * pagination => the list is paginated using default values
      * error => 403 if user tries to add queries
    * `/lists/shapes`
      * resp => a list of shapes
      * pagination => the list is paginated using default values
      * error => 403 if user tries to add queries

<br>

## 💭 Reflections 💭
***
This project was interesting. A nice change of pace to start working with backend and not focus on frontend. I am looking forward to next week when we dive into MongoDB! 😄

<br>

Issues that came up:
- none of note 


If I were to continue on this project / start over I would:
- provide API documentation
- setup a error middleware handler

<br>

***

## Try it live

netlifylink