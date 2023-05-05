# Project Express API

The project for this week was to create a RESTful API using Express. The API needed to have at least two endpoints - one that would return an array of data, and one that was capable of returning a specific/single item. There was also the option to accept filters via query parameters which I included. 

## Some Documentation

Bridget's Books is an API that allows users to fetch data about which books Bridget has read, wants to read, is currently reading, or did not finish.

* /bridgetsbooks
methods: GET
accepts the following query params: 
readstatus: filters by the read status; the values of readstatus must be one of the following -> read, to-read, currently-reading, did-not-finish & 
author: filters by author name and accepts partial names as well as exact names

* /bridgetsbooks/:isbn
methods: GET
matches exact ISBN numbers


## View it live

https://project-express-api-jonj3fewvq-lz.a.run.app/
