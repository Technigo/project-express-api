# Express API Project

In this project, my first backend project, I created an API in Node using Express. It has several endpoints that return either an array of data or a single item.

The goal for this project was to learn how to install and setup an Express server, how to deploy Node projects, how to build an API and how to create routes and also to practice data manipulation in JavaScript (selecting, filtering and liming arrays).

## The problem

I used a hard-coded set of data about avocado sales and average prices from a selection of US States and created the endpoints below using the following array methods: .find(), .filter() and .sort(). 

"/" = Main route
"/endpoints" = Shows all endpoints
"/avocadosales" = Shows all avocado sales
"/avocadosales/lowestaverageprice" = Sorts data by average price in ascending order
"/avocadosales/highestaverageprice" = Sorts data by average price in descending order
"/avocadosales/region/:region" = Filters data based on region
"/avocadosales/date/:date" = Filters data based on date
"/avocadosales/id/:id" = Finds a specific avocado sale based on id


If I had more time I would also use .slice() to limit the items returned for the average prices (for example only showing the 10 lowest/highest average prices). I would also use queries to make the handling of data more advanced.

## View it live


