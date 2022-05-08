# Project Express API

This week's project was to start our backend journey by creating an API using Express.
The API should have at least a couple of RESTful endpoints which return either an array
of data or a single item. We have also talked a little about the usage of path parma which
is often more used for something specific and query which is used more for a collection of things.

## The project

I used a data set I found on kaggle that I converted from a CSV to a JSON about the top 44 healthy
cities in the world 2021.
The dataset shows the city and its rank,
City info: sunshine hours, cost of a water bottle, pollution index, annual hours work, outdoor activity, number of takeout places, cost of a monthly gym membership.
Country info: obesity level, life expectancy years,happiness level.

The routs I've done are for all the data /healthyLifestyles
a route for only on city /healthyLifestyles/:city
a route for the rank a city is in /healthyLifestyles/rank/:rank
a route showing the cities with sunshine hours are over 2500 /healthyLifestyles/top/sunshineHours

## View it live

https://healthy-lifestyle-cities-2021.herokuapp.com/
